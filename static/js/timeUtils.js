/**
 * Gets the time, in seconds, since the start of the program.
 * @returns The time, in seconds, since the start of the program.
 */
export function getTime() {
	return millis() / 1000;
}

/**
 * Returns how long the program will have ran for some number of minutes in the future.
 * Or, time in seconds from `setup()` to target time.
 * @param {number} mins - The number of minutes in the future.
 * @returns {number} How long the program would have ran `mins` minutes in the future, in seconds.
 */
export function getTargetTime(mins) {
	return getTime() + mins * 60;
}

/**
 * Returns the difference in time between `current` and `target` in hours, minutes, and seconds.
 * @param {number} current - The current time, in seconds
 * @param {number} target - The target time, in seconds
 * @returns {Object} An object that maps strings to numbers, where the keys (hours, minutes, seconds) map to how many of each are left in the current section.
 */
export function getTimeDifference(current, target) {
	// TODO: #1 Change this to return a more appropriate structure, maybe object.

	const diff = target - current;

	return {
		hours: Math.floor(diff / 60 / 60),
		minutes: Math.floor(diff / 60),
		seconds: diff.toFixed(2),
	};
}