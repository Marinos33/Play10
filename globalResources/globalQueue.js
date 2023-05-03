class Queue {
    static queue = [];
  
    static push(song) {
      Queue.queue.push(song);
    }
  
    static shift() {
      Queue.queue.shift();
    }

    static pop() {
        return Queue.queue.pop();
    }

    static clear() {
        Queue.queue = [];
    }

    static getQueue() {
        return Queue.queue;
    }

    static length() {
        return Queue.queue.length;
    }
  }
  
  module.exports = {
    Queue
  };