const socket = io("http://localhost:3001")
const messageContainer = document.getElementById("message-container")
const messageForm = document.getElementById("send-container")
const messageInput = document.getElementById("message-input")
const name= prompt('what is your name ?')
const appendMessage = message =>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}

appendMessage('You joined')
socket.emit('new-user', name)

socket.on('chat-message', data =>{
    appendMessage(`${data.name} : ${data.message}`)
})

socket.on('user-connected', user =>{
    appendMessage(`${user} connected`)
})

socket.on('user-disconnected', user =>{
    appendMessage(`${user} disconnected`)
})


messageForm.addEventListener("submit", e => {
    e.preventDefault();
    const message = messageInput.value;
    socket.emit("send-chat-message",message)
    messageInput.value = '';

})