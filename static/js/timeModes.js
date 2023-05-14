import TimeInformation from "./timeInformation.js";

/**
 *
 * @param {TimeInformation} timeInfo
 * @returns
 */
export function independent(timeInfo) {
	return [
		`${timeInfo.currentSectionType} for ${timeInfo.currentSectionLength} minutes.`,
		`${timeInfo.hoursRemaining} hours remaining.`,
		`${timeInfo.minutesRemaining} minutes remaining.`,
		`${timeInfo.secondsRemaining} seconds remaining.\n`,
	].join("\n");
}

/**
 *
 * @param {TimeInformation} timeInfo
 * @returns
 */
export function dependent(timeInfo) {
	const modCycle = (n, threshold) => (n >= threshold ? n % threshold : n);
	const secondsFixed = parseFloat(
		modCycle(timeInfo.secondsRemaining, 60)
	).toFixed(2);

	return [
		`${timeInfo.currentSectionType} for ${timeInfo.currentSectionLength} minutes.`,
		`${timeInfo.hoursRemaining} hours and`,
		`${modCycle(timeInfo.minutesRemaining, 60)} minutes and`,
		`${secondsFixed} seconds remaining.\n`,
	].join("\n");
}