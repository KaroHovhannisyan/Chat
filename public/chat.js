//chat.js

window.onunload = function(){
}

window.onload = function () {
    var socket = io.connect('http://localhost:8080');
   
    var field = document.getElementById('field');
    var form = document.getElementById('form');
    var content = document.getElementById('content');
    var UserName =  document.getElementById('title');
    var onLineUsers = document.getElementById('usersOnline');

    var name = prompt("What is Your Name?");
    if(name){
        socket.emit('newUser',{name:name});
    }
    
    
    
    
    
    form.onsubmit = function(){
        var text = field.value;
        socket.emit('send',{message:text,name:name});
        document.getElementById("field").value = '';
        return false;        
    }
    
    
    
    socket.on('registered',function(name){
         UserName.innerHTML = "Welcome to chat " +name;
    });

    socket.on('addUserOnine',function(data){
        console.log(data);
        var online ="";
        for(var i = 0;i<data.length;i++){
            
                 online +="<div class='online'><span>"+data[i].user+"</span> <img ></div>";
                    
            }
        onLineUsers.innerHTML=online;
        
    });
    
    
    var messages = new Array();
   
    var online="";
    socket.on('message',function(data){
         var html = '';
        
        
        if(data.message){
            var newMsg ={msg:data.message,name:data.name}
            messages.push(newMsg);
            for(var i = 0;i<messages.length;i++){
                html+= 
                    "<div class='msg'><b id='senderName'>"+messages[i].name+": </b>"  +messages[i].msg+"<br/></div>";
            }
            content.innerHTML=html;
           
            
        }else{
            console.log("Error");
        }
        
    });
//    socket.on('notification',function(data){
//    html+="<span>"+data.notificaton +"</span>";
//    content.innerHTML = html;
//        
//    });

};




