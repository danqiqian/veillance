var https = require('https');
var fs = require('fs'); // Using the filesystem module

var credentials = {
  key: fs.readFileSync('/etc/letsencrypt/live/dqq200.itp.io/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/dqq200.itp.io/fullchain.pem')
};

// normal express code
var express = require('express');
// make an express application, install in app
var app=express();
//listen on port3000
// var server=app.listen(80);
//app to host everything in public directory
app.use(express.static('public'));
app.get('/', function(req, res) {
	res.send("Hello World!");
});

var httpsServer = https.createServer(credentials, app);
// Default HTTPS Port
httpsServer.listen(443);

// import statement
var socket = require('socket.io');
// io keeps tracking inputs and outputs messages
var io=socket(httpsServer);
var clients = [];

// call back function, when connection event triggered
io.sockets.on('connection',function(socket){
  console.log('new connection: '+ socket.id);

  for (let i = 0; i < clients.length; i++) {
    socket.emit('createNewImage', clients[i].id);
    // socket.broadcast.emit('createNewImage',socket.id);
    clients[i].emit('createNewImage',socket.id);
      if (clients[i].id == socket.id) {
    		clients.splice(i, 1);  
       	}
  }

  clients.push(socket);

  socket.on('disconnect',function(data){
    console.log('Socket disconnected: ' + socket.id);
    socket.broadcast.emit('lostClient', data);
    socket.broadcast.emit('removeOldImage',socket.id);
    //find from the clients list,  find whatever is true for the function
    let index = clients.findIndex(function(s) { return s.id == socket.id; });
    clients.splice(index,1);
  });

  socket.on('click', function(data) {
    socket.broadcast.emit('click',data);
  });

  socket.on('mousemove',function(data){
    socket.broadcast.emit('mousemove',{'mouse':data,'id':socket.id});
  });

  socket.on('getLocationFrom',function(data){
    //? these are two ways of send private msg to a client, idk which would work
    var toName = data.to;
    var toId = data.id;
    socket.broadcast.to(anotherSocket.id).emit("getLocationFrom",data);
    //change `${socketId}` to data?
    io.to(`${socketId}`).emit('Hey, you just been assumed as a fake mouse');
  });
});

console.log("my socket server is running");
