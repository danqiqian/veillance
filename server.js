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
    socket.emit('createNewMouse', clients[i].id);

    if (clients[i].location) {
      socket.emit('currentLocation',{'id':clients[i].id, 'location':clients[i].location});
    }

    // socket.broadcast.emit('createNewImage',socket.id);
    clients[i].emit('createNewMouse',socket.id);
      if (clients[i].id == socket.id) {
    		clients.splice(i, 1);  
        break;
       	}
  }

  clients.push(socket);

  socket.on('disconnect',function(data){
    console.log('Socket disconnected: ' + socket.id);
    //socket.broadcast.emit('lostClient', socket.id);
    //socket.broadcast.emit('removeOldImage',socket.id);
    io.emit('lostClient', socket.id);
    io.emit('removeOldImage',socket.id);
    //find from the clients list,  find whatever is true for the function
    let index = clients.findIndex(function(s) { return s.id == socket.id; });
    console.log(index);
    clients.splice(index,1);
  });

  socket.on('click', function(data) {
    socket.broadcast.emit('click',{'mouse':data,'id':socket.id});
    // console.log("click data: " + data);
    console.log("clicked id"+socket.id);
    // console.log(locationName);
    // socket.broadcast.emit('currentLocation',{'id':socket.id, 'location':locationName});
  });

  socket.on('mousemove',function(data){
    socket.broadcast.emit('mousemove',{'mouse':data,'id':socket.id});
    // console.log(data);
  });

  socket.on('currentLocation',function(data){
// Find my client
    for (var i = 0; i < clients.length; i++) {
      if (clients[i].id == socket.id) {
        // this is me
        // save my location for later peopel
        clients[i].location = data;
      }
    }
    socket.broadcast.emit('currentLocation',{'id':socket.id, 'location':data});
    console.log("curr loc server: " + data);
  });
});

console.log("my socket server is running now");
