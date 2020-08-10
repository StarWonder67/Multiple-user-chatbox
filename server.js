
const io = require('socket.io')(3000) //server runs on port 3000

const users = {}
//everytime a clieant connects to this server, server 
  
io.on('connection',socket=>{
	
	// socket.emit(chat-message','Hello world') //emitting msg to client
	socket.on('new-user',name=>{
		//server recieving new user name and storing name in users array which has socket.id as the key(unique)
		users[socket.id] = name

		//event name-user-connected, sending name of the user which has connected to every other user or client
		socket.broadcast.emit('user-connected',name)
	})

	socket.on('send-chat-message',message=>{ //receving message from client
		
		// socket.broadcast.emit('chat-message',message)//broadcasting msg from client to all other remaining clients except the client hich sent the msg
		socket.broadcast.emit('chat-message',{
			message : message,
			nameUser : users[socket.id]
		})


	})
})
//'chat-message' is the event name,"hello world" is the message
