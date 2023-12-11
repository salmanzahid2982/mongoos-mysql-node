const bodyParser = require('body-parser');
const  express = require('express');
const app = express();

//mogoose Connection
require('./Mongoose/models')

//Sequelize Connection
require('./Sequelize/models');

var userCtrl=require('./Sequelize/controllers/userController')
var movieCtrl=require('./Mongoose/controllers/movieController')
app.use(bodyParser.json());
app.get('/',function(req,res){
    res.send('Hello World')
})

// Sequelize Mysql Routes  
app.get('/add',userCtrl.addUser)

app.get('/users',userCtrl.getUsers)

app.get('/users/:id',userCtrl.getUser);

app.post('/users',userCtrl.postUsers)

app.delete('/users/:id',userCtrl.deleteUser);

app.get('/query',userCtrl.queryUser)

app.get('/one-to-one',userCtrl.oneToOneUser);

app.get('/one-to-many',userCtrl.oneToManyUser)

app.get('/many-to-many',userCtrl.manyToMany)

app.get('/eager-loading',userCtrl.eagerLoading);


//mongo routes

app.get('/mongo/add-movie',movieCtrl.addMovies)

app.get('/mongo/all-movies',movieCtrl.getAllMovies)

app.get('/mongo/movie/:id',movieCtrl.getMovie)

app.patch('/mongo/movie/:id',movieCtrl.updateMovie)

app.delete('/mongo/movie/:id',movieCtrl.deleteMovie)

app.get('/mongo/filter-query',movieCtrl.filterQuery)

app.get('/mongo/advanced-query',movieCtrl.advancedQuery)

app.get('/mongo/aggregate-query',movieCtrl.aggregateQuery)


app.listen(3000,()=>{
    console.log('App will run on :3000');
})