export default class ScrollingArray {
	index = 0;
	arr = [];

	constructor(arr) {
		this.arr = arr;
	}

	peekNext() {
		return this.nextIsNotOutOfBounds
			? this.arr[0]
			: this.arr[this.index + 1];
	}
	next() {
		return this.nextIsNotOutOfBounds
			? this.arr[(this.index = 0)]
			: this.arr[++this.index];
	}
	peekPrevious() {
		return this.previousIsNotOutOfBounds
			? this.arr[this.index - 1]
			: this.arr[this.arr.length - 1];
	}
	previous() {
		return this.previousIsNotOutOfBounds
			? this.arr[--this.index]
			: this.arr[(index = this.arr.length - 1)];
	}

	get nextIsNotOutOfBounds() {
		return this.index + 1 >= this.arr.length;
	}

	get previousIsNotOutOfBounds() {
		return this.index - 1 >= 0;
	}

	get current() {
		return this.arr[this.index];
	}

	get length() {
		return this.arr.length;
	}
}
