

var remote_net = require('net');

var REMOTE_PORT = 12002;

var remoteClients = [];

remote_net.createServer(function(socket){
    console.log('Connected Remote Client: ' + socket.remoteAddress +':'+ socket.remotePort);
    remoteClients.push(socket); //add client
    
    socket.on('close', function() {
        for(var i = 0; i < remoteClients.length; i++) {
            if(remoteClients[i] == socket) { //remove client
                remoteClients.splice(i,1);
                break;
            }
        }
    console.log('Disconnected remote client: ' + socket.remoteAddress +':'+ socket.remotePort);
    });
    // Add a 'data' event handler to this instance of socket
    socket.on('data', function(data) {
        for ( var i = 0; i < data.length; i++){
            handleByte(data[i]);
        }
        function handleByte(buf){
         console.log(buf);   
        }
        
    });
}).listen(REMOTE_PORT);
console.log('Server listening for remote connections on ' + REMOTE_PORT);
