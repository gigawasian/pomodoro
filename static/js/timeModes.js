import TimeInformation from "./timeInformation.js";

/**
 * Generates a string based on the time information where the units are dependent on each other.
 * A simplified example - one hour remaining is formatted as `"1 hour, 0 minutes, 0 seconds."`
 * @param {TimeInformation} timeInfo
 * @returns A string with information about the current session and time remaining.
 */
export function dependent(timeInfo) {
	const modCycle = (n, threshold) => (n >= threshold ? n % threshold : n);

	const minutesFixed = modCycle(timeInfo.minutesRemaining, 60);
	const secondsFixed = parseFloat(modCycle(timeInfo.secondsRemaining, 60)).toFixed(2);

	return [
		`${timeInfo.currentSectionType} for ${timeInfo.currentSectionLength} minutes.`,
		`${timeInfo.hoursRemaining} hours and`,
		`${minutesFixed} minutes and`,
		`${secondsFixed} seconds remaining.\n`,
	].join("\n");
}

/**
 * Generates a string based on the time information where the units are independent from each other.
 * A simplified example - one hour remaining is formatted as `"1 hour, 60 minutes, 3200 seconds."` 
 * @param {TimeInformation} timeInfo
 * @returns A string with information about the current session and time remaining.
 */
export function independent(timeInfo) {
	return [
		`${timeInfo.currentSectionType} for ${timeInfo.currentSectionLength} minutes.`,
		`${timeInfo.hoursRemaining} hours remaining.`,
		`${timeInfo.minutesRemaining} minutes remaining.`,
		`${timeInfo.secondsRemaining} seconds remaining.\n`,
	].join("\n");
}
