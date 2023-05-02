class Queue {
    static queue = [];
  
    static push(song) {
      Queue.queue.push(song);
    }
  
    static shift() {s
      Queue.queue.shift();
    }
  }
  
  module.exports = {
    Queue
  };