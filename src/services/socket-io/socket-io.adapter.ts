import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { NameSpaceConstants } from 'src/common/socket-constants/namespace.constant';

@Injectable()
export class SocketIoService {
  constructor() {}

  public initSocketIo(server: any) {
    const io = new Server(server);

    // CHAT Namespace
    io.of(NameSpaceConstants.CHAT).on('connection', (socket) => {
      socket.on('chat message', (msg) => {
        io.of(NameSpaceConstants.CHAT).emit('chat message', msg);
      });

      socket.on('typing', (username) => {
        socket.broadcast.emit('typing', { username });
      });

      socket.on('stop typing', (username) => {
        socket.broadcast.emit('stop typing', { username });
      });

      socket.on('disconnect', () => {});
    });

    // USER Namespace
    io.of(NameSpaceConstants.USER).on('connection', (socket) => {
      socket.broadcast.emit('user event response', { type: 'joined', id: socket.id });
      socket.on('disconnect', () => {
        socket.broadcast.emit('user event response', { type: 'left', id: socket.id });
      });
    });

    return io;
  }
}
