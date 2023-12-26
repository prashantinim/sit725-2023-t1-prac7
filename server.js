let express = require('express');
let app = express();
let port = process.env.port || 3000;
require('./dbConnection');
let router = require('./routers/router');
let http = require('http').createServer(app);
let io = require('socket.io')(http);



app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api/swiss',router); //with api cat file i am using this router 

io.on('connection', function(socket){
    console.log('user connected');
    
    socket.on('chat message', function(msg){
        io.emit('chat message', msg); //message to all users

        if(msg.toLowerCase().includes('feedback')) {
            io.emit('bot message', 'Thank you for your feedback!');
        }
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

});


http.listen(port, ()=>{
    console.log('express server started');
});