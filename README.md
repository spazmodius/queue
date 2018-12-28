# Spaz's FIFO Queue

A smokin' fast, memory-effecient FIFO queue for Node.js.

## Install
`npm install spazmodius/queue`

## Usage
``` js
const Queue = require('@spazmodius/queue')

const q = Queue()  // or new Queue; you do you

q.enqueue('a')
q.enqueue(4)

console.log(q.length)		// 2

console.log(q.dequeue())	// "a"
console.log(q.dequeue())	// 4
console.log(q.dequeue())	// undefined
```

That's it, pretty simple.