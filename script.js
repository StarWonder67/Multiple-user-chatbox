

const socket = io('http://localhost:3000') //location where our server is hosting our socket js appl
const messageForm = document.getElementById('send-container')
const messageContainer = document.getElementById('message-container')
const messageInput = document.getElementById('message-input')



//sending new user name to server
const name = prompt('What is your name')
appendMessage('You joined')
socket.emit('new-user',name);


//when client connects to server socket it displays the message sent by server
socket.on('chat-message',data=>{
	appendMessage(data.nameUser + ': ' + data.message ) //calling function passing data recived from server
})

//when a new user connects, event user connected sends name and has to be appended to msg
socket.on('user-connected',name=>{
	appendMessage(name +  ' connected') //calling function passing data recived from server
})



messageForm.addEventListener('submit',e=>{
	e.preventDefault() //doesnt let page refresh,prevents losing typed message
	const message = messageInput.value
	
	appendMessage('You: ' + message )
	socket.emit('send-chat-message',message) //sending message to server
	messageInput.value = '';
})

function appendMessage(message){
	const messageElement = document.createElement('div')//creating elemtn for a new msg recieved by client
	messageElement.innerText = message //setting value of ele to message recieved in parametr
	messageContainer.append(messageElement) //adding new msg elemnt to the container elemnt

}