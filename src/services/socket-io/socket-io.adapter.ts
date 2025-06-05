import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class SocketIoService {
  constructor() {}

  public initSocketIo(server: any) {
    const io = new Server(server);

    io.on('connection', (socket) => {
      console.log('A user connected:', socket.id);

      socket.on('chat message', (msg) => {
        console.log('Message received:', msg);
        io.emit('chat message', msg);
      });

      socket.on('typing', (username) => {
        console.log(`${username} is typing...`);
        socket.broadcast.emit('typing', { username });
      });

      socket.on('stop typing', (username) => {
        console.log(`${username} stopped typing.`);
        socket.broadcast.emit('stop typing', { username });
      });

      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
    });

    return io;
  }
}
