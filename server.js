// this worked after, on Amazon-Linux AMI running:
    //sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
    //sudo iptables -A INPUT -p tcp -m tcp --sport 80 -j ACCEPT
    //sudo iptables -A OUTPUT -p tcp -m tcp --dport 80 -j ACCEPT

var remote_net = require('net');

var REMOTE_PORT = 8080;

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
