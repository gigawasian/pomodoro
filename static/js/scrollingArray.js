export default class ScrollingArray {
	index = 0;
	arr = [];

	constructor(arr) {
		this.arr = arr;
	}

	/**
	 * Returns the next item, or the first if the current index in the index of the last element.
	 * Reads from but does not modify the index.
	 * @returns The next or first item in the array.
	 */
	peekNext() {
		return this.nextIsNotOutOfBounds
			? this.arr[0]
			: this.arr[this.index + 1];
	}

	/**
	 * Same as `peekNext`, but updates the index to the index of the next or first element as well.
	 * @returns The next or first item in the array.
	 */
	next() {
		return this.nextIsNotOutOfBounds
			? this.arr[(this.index = 0)]
			: this.arr[++this.index];
	}

	/**
	 * Returns the previous item, or the last if the current index is the index of the first element.
	 * Reads from but does not modify the index.
	 * @returns The previous or last item in the array.
	 */
	peekPrevious() {
		return this.previousIsNotOutOfBounds
			? this.arr[this.index - 1]
			: this.arr[this.arr.length - 1];
	}

	/**
	 * Same as `peekPrevious`, but updates the index to the index of the previous or last element as well.
	 * @returns The previous or last item in the array.
	 */
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
