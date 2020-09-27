//for connection purpose
const io=require('socket.io')(PORT)
//all users store here
const users={};
//whenever connection method call..
io.on('connection',socket=>{
    console.log('connection')
    //whenever new-user-joined...
    socket.on('new-user-joined',name=>{
        users[socket.id]=name;
        // today=new Date();
        // time=today.getHours()+':'+today.getMinutes();
        socket.broadcast.emit('user-joined',name)
    });
    
    ///whenever send method call..
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    });
    
    //whenevr recive method call..
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id];
    });

    socket.on('left',name=>{
        append(`${name}`,'left the chat','left',`${time}`)
    })
})
