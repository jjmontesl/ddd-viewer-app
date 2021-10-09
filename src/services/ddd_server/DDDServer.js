
import { io } from "socket.io-client";

class DDDServerClient {

  initialize() {

    const wsurl = "ws://localhost:8085"
    const socket = io(wsurl);

    socket.on('connect', () => {

      console.debug("Socket connected.")

      socket.emit('chat_message', 'test'); // emit an event to the socket
      socket.emit('status_get', null); // emit an event to the socket

      //io.emit('broadcast', 'test'); // emit an event to all connected sockets

    });

    socket.on('status', this.status ); // listen to the event
    //socket.on('pipeline', () => { /* … */ }); // listen to the event

  }

  status(data) {
    console.debug("Status received");
    console.debug(data);
  }

}

export { DDDServerClient };
