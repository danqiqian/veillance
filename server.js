// use express to host p5.js in a directory
// module name:express, get access to express
var express = require('express');
// make an express application, install in app
var app=express();
//listen on port3000
var server=app.listen(80);
//app to host everything in public directory
app.use(express.static('public'));

// import statement
var socket = require('socket.io');
// io keeps tracking inputs and outputs messages
var io=socket(server);
var clients = [];

// call back function, when connection event triggered
io.sockets.on('connection',function(socket){
  console.log('new connection: '+ socket.id);
  // Every time you get a new connection
  // Emit a message over the socket connection that tells it all the images to populate with
  for (let i = 0; i < clients.length; i++) {
    socket.emit('createNewImage', clients[i].id);
    clients[i].emit('createNewImage',socket.id);
  }
  clients.push(socket);

  // socket.broadcast.emit('createNewImage',socket.id);

  socket.on('disconnect',function(data){
    // What is the Socket.id of the client that disconnected?
    // Emit that ID to all other active clients

    console.log('Socket disconnected: ' + socket.id);
    socket.broadcast.emit('lostClient',data);


    socket.broadcast.emit('removeOldImage',socket.id);
  });

  socket.on('mousemove',function(data){
    socket.broadcast.emit('mousemove',{'mouse':data,'id':socket.id});
    //io.sockets.et('mouse',data);
    // console.log('Socket connected: ' + socket.id);
  });

});

  //runs for each user connection



console.log("my socket server is running");
