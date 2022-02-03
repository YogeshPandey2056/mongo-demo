// const EventEmitter = require('events');

// class Logger extends EventEmitter {
//     log(message) {
//         console.log(message);
//         this.emit('xyz',{id:1,url:'http://'})

//     }
// }



// module.exports = Logger;

function log(req,res,next){
    console.log('Logging.....');
    next();
}



module.exports = log;