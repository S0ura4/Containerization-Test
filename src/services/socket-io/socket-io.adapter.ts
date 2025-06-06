import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io'; // Import Socket
import { NameSpaceConstants } from 'src/common/socket-constants/namespace.constant';

@Injectable()
export class SocketIoService {
  constructor() {}

  public initSocketIo(server: any) {
    const io = new Server(server, {
      // NEW: Add a maxHttpBufferSize to handle larger base64 strings.
      // Default is 1MB, which might be too small for some images.
      // Let's set it to 10MB. Be careful with this setting in production!
      maxHttpBufferSize: 1e7, // 10 million bytes
    });

    // CHAT Namespace
    io.of(NameSpaceConstants.CHAT).on('connection', (socket: Socket) => {
      // CHANGED: Use socket.broadcast.emit to send to everyone *except* the sender.
      // The sender's UI will update instantly on their own.
      socket.on('chat message', (data) => {
        socket.broadcast.emit('chat message', data);
      });

      // CHANGED: Use socket.broadcast.emit here as well.
      socket.on('chat file', (data) => {
        socket.broadcast.emit('chat file', data);
      });

      // These are already correctly using broadcast, so no changes needed.
      socket.on('typing', (username) => {
        socket.broadcast.emit('typing', { username });
      });

      socket.on('stop typing', (username) => {
        socket.broadcast.emit('stop typing', { username });
      });

      socket.on('disconnect', () => {});
    });

    // USER Namespace (no changes needed)
    io.of(NameSpaceConstants.USER).on('connection', (socket) => {
      socket.broadcast.emit('user event response', { type: 'joined', id: socket.id });
      socket.on('disconnect', () => {
        socket.broadcast.emit('user event response', { type: 'left', id: socket.id });
      });
    });

    return io;
  }
}
