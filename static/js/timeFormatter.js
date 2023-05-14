import ScrollingArray from "./scrollingArray.js";

export default class TimeFormatter {
	formatters;

	constructor(formatters) {
		this.formatters = new ScrollingArray(formatters);
	}
	
	next() {
		this.formatters.next();
	}
	previous() {
		this.formatters.previous();
	}
	textFrom(timeInformation) {
		return this.formatters.current(timeInformation);
	}
}