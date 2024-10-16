"use strict";

// Imports
import express from 'express';
import session from 'express-session';
import oktaPkg from '@okta/oidc-middleware';
const { ExpressOIDC } = oktaPkg;
import { Server } from 'socket.io';
import { Issuer } from 'openid-client';

import openidConnectPkg from 'express-openid-connect';
const { auth, requiresAuth } = openidConnectPkg;
import cons from 'consolidate';
import path from 'path';
import https from 'https';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { unalib } from './unalib/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


let app = express();

// Crear el servidor HTTPS
const server = https.createServer(app);

// Inicializar socket.io usando el servidor
const io = new Server(server);


// Globals
const OKTA_ISSUER_URI = "https://dev-vvnqq5np3m4yuzs6.us.auth0.com"
const OKTA_CLIENT_ID = "mqMg6cTFLFI6T89O5mZmQwhkjtWoo6c2";
const OKTA_CLIENT_SECRET = "4PNFOHoPelgjQ49pEuxsonAigF1Th7FtQ4-M9jwSnATJu9JGJMQcwa-fjpIfo8He";
const REDIRECT_URI = "https://localhost:3000/dashboard";
const PORT = process.env.PORT || "3000";
const SECRET = "hjsadfghjakshdfg87sd8f76s8d7f68s7f632342ug44gg423636346f"; // Dejar el secret así como está.

// SSL Certificate Paths (Replace with your certificate file paths)
const sslOptions = {
  key: fs.readFileSync('certs/localhost/localhost.key'),  // Path to your SSL key
  cert: fs.readFileSync('certs/localhost/localhost.crt') // Path to your SSL certificate
};

// Okta Configuration
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: SECRET,
  baseURL: 'https://localhost:3000',
  clientID: 'mqMg6cTFLFI6T89O5mZmQwhkjtWoo6c2',
  issuerBaseURL: 'https://dev-vvnqq5np3m4yuzs6.us.auth0.com'
};

let oidc = new ExpressOIDC({
  issuer: OKTA_ISSUER_URI,
  client_id: OKTA_CLIENT_ID,
  client_secret: OKTA_CLIENT_SECRET,
  redirect_uri: REDIRECT_URI,
  routes: { callback: { defaultRedirect: "https://localhost:3000/dashboard" } },
  scope: 'openid profile'
});

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// MVC View Setup
app.engine('html', cons.swig);
app.set('views', path.join(__dirname, 'views'));
app.set('models', path.join(__dirname, 'models'));
app.set('view engine', 'html');

// App middleware
app.use("/static", express.static("static"));

app.use(session({
  cookie: { httpOnly: true },
  secret: SECRET
}));

// App routes
app.use(oidc.router);

app.get("/", (req, res) => {
  res.render("index");  
});

// Middleware (requiresAuth) for protected route
app.get("/dashboard", requiresAuth(), (req, res) => {  
  var payload = Buffer.from(req.appSession.id_token.split('.')[1], 'base64').toString('utf-8');
  const userInfo = JSON.parse(payload);
  res.render("dashboard", { user: userInfo });
});

// Middleware (requiresAuth) for protected route
app.get("/chat", requiresAuth(), (req, res) => {  
  var payload = Buffer.from(req.appSession.id_token.split('.')[1], 'base64').toString('utf-8');
  const userInfo = JSON.parse(payload);
  res.render("chat", { user: userInfo });
});

Issuer.defaultHttpOptions.timeout = 20000;
io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');

  // Escuchar "Evento-Mensaje-Server"
  socket.on('Evento-Mensaje-Server', (msg) => {
    // Validar el mensaje con unalib
    const validatedMessage = unalib.validateMessage(msg);

    // Emitir el mensaje validado a todos los clientes conectados
    io.emit('Evento-Mensaje-Server', validatedMessage);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});
// Start the server with HTTPS
oidc.on("ready", () => {
  https.createServer(sslOptions, app).listen(parseInt(PORT), () => {
    console.log("HTTPS Server running on port: " + PORT);
  });
});

oidc.on("error", err => {
  console.error(err);
});

// Export the app for use in tests
export default app;