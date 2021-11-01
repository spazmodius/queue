'use strict'

function Queue() {
	let length = 0
	let head = Array(), headIndex = 0
	let tail = head, tailIndex = 0

	head.next = Array()
	head.next.next = head

	//  same block, headIndex === 0
	const ABC = {
		enqueue(value) {
			tail[ tailIndex++ ] = value
			return ++length
		},
		dequeue() {
			if (length === 0)
				return undefined
			const value = head[ headIndex ]
			head[ headIndex++ ] = undefined
			if (--length === 0)
				headIndex = tailIndex = 0
			else if (tailIndex < head.length)
				state = E
			else {
				tail = head.next
				tailIndex = 0
				state = KMO
			}
			return value
		}
	}

	// same block, headIndex > 0
	const E = {
		enqueue(value) {
			tail[ tailIndex++ ] = value
			if (tailIndex === tail.length) {
				tail = tail.next
				tailIndex = 0
				state = KMO
			}
			return ++length
		},
		dequeue() {
			const value = head[ headIndex ]
			head[ headIndex++ ] = undefined
			if (--length === 0) {
				headIndex = tailIndex = 0
				state = ABC
			}
			return value
		}
	}

	// different blocks
	const KMO = {
		enqueue: ABC.enqueue,
		dequeue() {
			const value = head[ headIndex ]
			head[ headIndex++ ] = undefined
			--length
			if (headIndex === head.length) {
				head = head.next
				headIndex = 0
				state = ABC
			}
			return value
		}
	}

	let state = ABC

	return {
		enqueue(value) { return state.enqueue(value) },
		dequeue() { return state.dequeue() },
		get length() { return length },
	}
}

module.exports = Queue
