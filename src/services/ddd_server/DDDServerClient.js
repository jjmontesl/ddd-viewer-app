
import { io } from "socket.io-client";
import { TASKS_SET } from "../../store/mutation-types";

class DDDServerClient {

  status = null;

  constructor(comp, store) {
    this.comp = comp;
    this.$store = store;
  }

  initialize() {

    const wsurl = "ws://localhost:8085"
    const socket = io(wsurl);

    socket.on('connect', () => {

      console.debug("Socket connected.")

      socket.emit('chat_message', 'test'); // emit an event to the socket
      socket.emit('status_get', null); // emit an event to the socket
      socket.emit('result_get', null); // emit an event to the socket

      //io.emit('broadcast', 'test'); // emit an event to all connected sockets

    });

    socket.on('status', (data) => { this.onStatus(data); } ); // listen to the event
    socket.on('result', (data) => { this.onResult(data); } ); // listen to the event
    //socket.on('pipeline', () => { /* … */ }); // listen to the event

  }

  onStatus(data) {
    console.debug("Status received");
    console.debug(data);

    this.$store.dispatch("setTasks", {'tasks': data.tasks});
  }

  onResult(data) {
    console.debug("Result received");
    //this.$store.dispatch("setResult", {'result': data.result});
    this.comp.setResult(data);
  }

}

export { DDDServerClient };
