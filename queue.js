'use strict'

function Block() {
	const block = Array(32)
	block.next = null
	return block
}

class _Queue {
	constructor() {
		this._length = 0
		this._head = Block()
		this._tail = this._head
		this._hx = 0
		this._tx = 0
	}

	enqueue(value) {
		if (this._tx === this._tail.length) {
			this._tail = this._tail.next ?? (this._tail.next = Block())
			this._tx = 0
		}
		this._tail[ this._tx++ ] = value
		return ++this._length
	}

	dequeue() {
		if (this._length === 0)
			return undefined

		const value = this._head[ this._hx ]
		this._head[ this._hx ] = 0

		if (--this._length === 0) {
			this._hx = this._tx = 0
		}
		else if (++this._hx === this._head.length) {
			const block = this._head
			this._head = block.next
			this._hx = 0
			block.next = null
			this._tail.next = block
		}

		return value
	}

	get length() { return this._length }
}

module.exports = function Queue() {
	return new _Queue()
}
