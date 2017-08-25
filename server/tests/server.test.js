const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'first'
}, {
  _id: new ObjectID(),
  text: 'second'
}];

//runs before every test case
beforeEach((done) => {
  Todo.remove({}).then(() => { //removes all todos
      return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
    .post('/todos')
    .send({text})//supertest converts object to JSON
    .expect(200)
    .expect((res) => {
        expect(res.body.text).toBe(text);
    })
    .end( (err,res) => {
        if (err)
         {
          return done(err);
         }

         Todo.find({text}).then((todos) => {
           expect(todos.length).toBe(1);
           expect(todos[0].text).toBe(text);
           done();
         }).catch((e) => done(e));
    });

  });

  it('should not create a todo with bad data', (done) => {
      request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err,res) => {

        if (err)
         {
          return done(err);
         }

         Todo.find().then((todos) => {
           expect(todos.length).toBe(2);
           done();
         }).catch((e) => done(e));

      });
  });

});


describe('Get /todos', () => {
  it('should get all todos', (done) =>{
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);

  });
});

describe('Get /todos/:id', () => {
  it('should return todo doc', (done) => {
      request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);

  });

  it('should return 404 if todo not found', (done) => {
    request(app)
    .get(`/todos/${(new ObjectID()).toHexString()}`)
    .expect(404)
    .expect( (res) => {
        expect(res.body.todo).toBe();
    })
    .end(done);
  });


  it('should return 404 for non-object ids', (done) => {
    request(app)
    .get('/todos/123')
    .expect(404)
    .expect( (res) => {
        expect(res.body.todo).toBe();
    })
    .end(done);
  });
});


describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var hexId = todos[1]._id.toHexString();

    request(app)
    .delete(`/todos/${hexId}`)
    .expect(200)
    .expect( (res) => {
      expect(res.body.todo._id).toBe(hexId);
    })
    .end((err,res) => {
      if(err)
      {
        return done(err);
      }

      Todo.findById(hexId).then( (todo) => {
          expect(todo).toNotExist();
          done(); //at this point the test is finished so we call done()
      }).catch((e) => done(e));

    });
  });

  it('should return 404 if todo not found', (done) => {
    request(app)
    .delete(`/todos/${(new ObjectID()).toHexString()}`)
    .expect(404)
    .expect( (res) => {
        expect(res.body.todo).toBe();
    })
    .end(done);
  });

  it('should return 404 if objectID is invalid', (done) => {
    request(app)
    .delete('/todos/123')
    .expect(404)
    .expect( (res) => {
        expect(res.body.todo).toBe();
    })
    .end(done);
  });

});
