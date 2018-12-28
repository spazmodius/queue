'use strict'

function Queue(blockLength = 100) {
	let length = 0
	let headIndex = 0, tailIndex = 0
	let head = Array(blockLength), tail = head
	
	function enqueue(value) {
		if (tailIndex === blockLength) {
			tailIndex = 0
			tail = tail.next || (tail.next = Array(blockLength))
		}

		tail[tailIndex++] = value
		return ++length
	}

	function dequeue() {
		if (length === 0) 
			return undefined

		--length
		const value = head[headIndex]
		head[headIndex] = undefined

		if (++headIndex === blockLength) {
			headIndex = 0
			if (length === 0)
				tailIndex = 0
			else {
				const node = head
				head = head.next
				node.next = null
				tail.next = node
			}
		}

		return value
	}

	return {
		enqueue,
		dequeue,
		get length() { return length },
	}
}

module.exports = Queue