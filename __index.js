//__index.js
var express = require("express");
var app = express();
var port = 8080;
app.set('views',__dirname + '/tpl');
app.set('view engine','jade');
app.engine('jade',require('jade').__express);
app.use(express.static(__dirname + '/public'));


var online= new Array();

app.get('/',function(req,res){
res.render('page');
});
var io =require('socket.io').listen(app.listen(port));

io.sockets.on('connection',function(client){
      client.on('disconnect',function(data){
          
    for (i = 0 ;i<online.length;i++){
        if(online[i].id === client.id){
           online.splice(i,1);
            client.broadcast.emit('addUserOnine',online);
            break;
        }
    }
});
    
    client.on('send',function(data){
              client.broadcast.emit('message',{message:data.message,name:data.name});
              client.emit('message',{message:data.message,name:"You"});
             
              });
    client.on('newUser',function(data)
  {
             online.push({user:data.name,
                     id:client.id});
             client.emit('registered',data.name) ;
             client.emit('addUserOnine',online);
             client.broadcast.emit('addUserOnine',online);
   });
    
  
    
    
});
