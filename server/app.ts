// import * as debug from 'debug';
import * as http from 'http';
import Server from './server';
import { normalizePort, onListening, onError } from './server';

// debug('ts-express:server');

console.log('app start');

const port: string | number | boolean = normalizePort(process.env.PORT || 23000);

Server.set('port', port);

console.log(`Server listening on port ${port}`);

const server: http.Server = http.createServer(Server);

// server listen
server.listen(port);

// server handlers
server.on(
  'error',
  (error) => onError(error, port));
server.on(
  'listening',
  onListening.bind(server));
