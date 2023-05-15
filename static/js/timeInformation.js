export default class TimeInformation {
	working;
	workTime;
	restTime;
	remainingTime;

	constructor(working, workTime, restTime, remainingTime) {
		this.working = working;
		this.workTime = workTime;
		this.restTime = restTime;
		this.remainingTime = remainingTime;
	}

	get currentSectionType() {
		return this.working ? "Working" : "Resting";
	}
	get currentSectionLength() {
		return this.working ? this.workTime : this.restTime;
	}
	get hoursRemaining() {
		return this.remainingTime.hours;
	}
	get minutesRemaining() {
		return this.remainingTime.minutes;
	}
	get secondsRemaining() {
		return this.remainingTime.seconds;
	}
}