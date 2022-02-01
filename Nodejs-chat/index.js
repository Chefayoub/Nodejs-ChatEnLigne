//Création du serveur via express
//initialisation du chemin
const io = require('socket.io')(3000)
console.log('je suis le serveur en écoute')
const users = {}

//Permet de gérer la connexion
io.on('connection', socket => {

  //connexion d'un utilisateur
  socket.on('new-user', name => {
    console.log(name + ' s\'est connecté');
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })

  //envoie d'un message
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })

  //deconnexion
  socket.on('disconnect', () => {
    console.log(users[socket.id] + ' s\'est déconnecté');
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})

