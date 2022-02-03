// // function sayHello(name) {
// //     console.log('Hello' + name);
// // }

// // // sayHello('Mosh');

// const logger = require('./logger');

// logger.log('message'); 

// const path = require('path')

// // var someObj = path.parse(__filename)

// // console.log(someObj)

// // const os = require('os')

// // var totalMemory = os.totalmem()
// // var freeMemory = os.freemem()

// // console.log(`Total Memory : ${totalMemory}`);
// // console.log(`Free Memory : ${freeMemory}`);

// // const fs = require('fs');

// // const files = fs.readdirSync('./');
// // console.log(files);

// // const EventEmitter = require('events');
// // const Logger = require('./logger');


// // const logger = new Logger();

// // logger.on('xyz', (arg) => {
// //      console.log('listened Message',arg);
// // });

// // logger.log('message');

// // const http = require('http');

// // const server = http.createServer((req,res) => {
// //     if (req.url === '/') {
// //         res.write('Hello World');
// //         res.end();
// //     }


// // var _ = require('underscore');

// // var result = _.contains([1,2,3],3);
// //  console.log(result);



// ////////////////////Express/////////////////////////////////


// const Joi = require('joi');
// const express = require('express');
// const app = express();
// require("dotenv").config();

// app.use(express.json());



// const courses = [{id:1,course:'course1'}, {id:2,course:'course2'},{id:3,course:'course3'}];

// app.get('/', (req,res) => {
//     res.send('Hello World');
// })

// app.get('/api/courses', (req,res) => {
//     res.send(courses);
// }) 

// app.get('/api/courses/:id', (req,res) => {
//    const course = courses.find(c => c.id === parseInt(req.params.id));
//    if(!course) res.status(404).send('The course with given id is not found')
//    else res.send(course);

// })

// app.post('/api/courses', (req,res) => {

//     const {error} = vallidatee(req.body);


//     if(error){
//         res.status(400).send(error.details[0].message);
//         return;
//     }

//     const course = {
//         id: courses.length + 1,
//         course: req.body.course
//     }
//     courses.push(course);
//     res.send(course);
// })

// app.put('/api/courses/:id', (req,res) => {
//     const course = courses.find(c => c.id === parseInt(req.params.id));
//     if(!course) res.status(404).send('Course not found');

//     const {error} = vallidatee(req.body);


//     if(error){
//         res.status(400).send(error.details[0].message);
//         return;
//     }

//         course.course = req.body.course;
//         res.send(course);
    

    
// })

// app.delete('/api/courses/:id',(req,res) => {
//     const course = courses.find(c => c.id === parseInt(req.params.id));
//     if(!course) {
//         res.status(404).send('Course not Found');
//     }

//     const index = courses.indexOf(course);
//     courses.splice(index,1);

//     res.send(course);



// })

// function vallidatee(course) {
//     const schema = Joi.object({
//         course: Joi.string().min(3).required()
//     });

//     return schema.validate(course);

// }
// const port = process.env.PORT || 3000;

// app.listen(port, () => console.log(`Listening to port ${port}...`));
 

/////////////////////////////VIDLY/////////////////////////////////////////////////
// const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const { indexOf } = require('underscore');
const app = express();

require("dotenv").config();
const logger = require('./middleware/logger')
const authh = require('./middleware/authorization');
const morgan = require('morgan');
const genres = require('./routes/genres');
const home = require('./routes/home');

mongoose.connect('mongodb://localhost/genresmovies', {
    useUnifiedTopology: true,
    UseNewUrlParser: true
})
.then(() => console.log('Conneccted to mongodb'))
.catch(err => console.error('Cannot connect to mongodb',err));

app.set('view engine','pug');
app.set('views','./views');

app.use([logger,authh]);

app.use('/api/genres',genres);
app.use('/',home);

// console.log('Application Name:' + config.get('name'));
// console.log('Mail:' + config.get('Mail.host'));

if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan Enabled');
}

port = process.env.PORT || 3000 ;

app.listen(port, (req,res) => console.log(`Listening to port ${port}....`));


