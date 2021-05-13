const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

app.get('/', (req, res) => {
  res.send('server is running');
});

server.listen(3000, () => {
  console.log('listening on port 3000');

  io.on('connection', (socket) => {
    socket.emit('greeting-from-server', {
      greeting: 'Hello Client',
    });
    socket.on('greeting-from-client', (message) => {
      console.log(message);
    });
  });
});

