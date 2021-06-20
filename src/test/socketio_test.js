import io from 'socket.io-client'

const socket = io('ws://localhost:4000')

socket.on('receiveMsg', function (data) {
    console.log('Browser received message: ', data);
})

socket.emit('sendMsg', { name: 'Tom', date: Date.now() })
console.log('Browser sends a message to server: ', { name: 'Tom', date: Date.now() });