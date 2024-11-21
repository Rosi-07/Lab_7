require('dotenv').config();

const express = require('express');
const session = require('express-session');
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
const http = require('http');
const socketIo = require('socket.io');
var cons = require('consolidate');
var path = require('path');
let app = express();
const server = http.createServer(app);
const io = socketIo(server);
const unalib = require('./unalib');

// Globals
const PORT = process.env.PORT || '3000';
const SECRET = process.env.SECRET;

// Auth0 Configuration
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

app.use(auth(config));
app.engine('html', cons.swig);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use('/static', express.static('static'));
app.use(session({ cookie: { httpOnly: true }, secret: SECRET }));

io.on('connection', function (socket) {
  console.log('A user connected');

  socket.on('Evento-Mensaje-Server', function (msg) {
    console.log('Mensaje recibido en el servidor:', msg);
    var validatedMessage = unalib.validateMessage(msg);
    console.log('Mensaje validado:', validatedMessage);
    io.emit('Evento-Mensaje-Server', validatedMessage);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/dashboard', requiresAuth(), (req, res) => {
  var payload = Buffer.from(
    req.appSession.id_token.split('.')[1],
    'base64'
  ).toString('utf-8');
  const userInfo = JSON.parse(payload);
  res.render('dashboard', { user: userInfo });
});

app.get('/chat', requiresAuth(), (req, res) => {
  var payload = Buffer.from(
    req.appSession.id_token.split('.')[1],
    'base64'
  ).toString('utf-8');
  const userInfo = JSON.parse(payload);
  console.log(userInfo);
  res.render('chat', { user: userInfo });
});

server.listen(PORT, () => {
  console.log('Server running on port: ' + PORT);
});
