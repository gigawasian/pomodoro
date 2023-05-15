import TimeFormatter from "./timeFormatter.js";
import * as timeModes from "./timeModes.js";

export const timeFormatter = new TimeFormatter([
	timeModes.dependent,
	timeModes.independent,
]);
