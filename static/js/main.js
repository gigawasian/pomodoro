// Due to the way processing works, some variables that are treated as constants can't be declared as such, because they must be set in `setup()`.
// We could probably avert this issue by severing the processing library from this project, and rewriting it in terms of DOM interaction.

import * as presets from "./presets.js";
import TimeInformation from "./timeInformation.js";

const modes = ["60x60", "25x25", "45x10", "1x1", "0.1x1", "0.02x0.02", "90x90"]; //add modes here
const timeFormatter = presets.timeFormatter;

var timerRunning = false;
var buttons = [];
var currentWorkTime, currentRestTime;
var working = true; //false=resting
var currentButtonsAmount = 0;
var buttonWidth, buttonHeight; // Should be constant, but due to the way processing works, must be set in `setup()`.
var endTime;
var doOnce = false; //for pomodoro screen
var theText; //for pomodoro screen - global
var timeLeft;
var soundEffect;

function setup() {
	buttonWidth = windowWidth / 5;
	buttonHeight = windowHeight / 10;

	createCanvas(windowWidth, windowHeight);

	soundEffect = loadSound("static/audio/sound effect.mp3");
	//setup screen
	background(200);

	textAlign(CENTER);

	buttons = makeButtonsFromModes(modes);
}

function draw() {
	if (timerRunning) pomodoro(currentWorkTime, currentRestTime);
}

function resetProgram() {
	//executes once to reset program
	buttons.forEach((b) => b.remove());
	timerRunning = false;
	clear();
	//setup screen
	background(200);

	textAlign(CENTER);

	buttons = makeButtonsFromModes(modes);
}

function mouseClicked() {
	if (timerRunning) timeFormatter.next();
}

/**
 * Makes one button to start the timer with the specified mode and destroys all other buttons.
 * @param {string} mode - The timer mode, formatted like so: `"<Work time>x<Rest time>"`
 */
function setMode(mode) {
	currentWorkTime = mode.substring(0, mode.indexOf("x"));
	currentRestTime = mode.substring(mode.indexOf("x") + 1);

	buttons.forEach((b) => b.remove());

	buttons = [
		makeButton(
			"start",
			(currentButtonsAmount = 1),
			() => (doOnce = timerRunning = true)
		),
	];
}

/**
 * Updates the screen to show the proper text about time left in a session.
 * @param {number} workTime - The time to spend working
 * @param {number} restTime - The time to spend resting
 */
function pomodoro(workTime, restTime) {
	textSize((windowWidth + windowHeight) / 2 / 25);

	if (doOnce) {
		buttons.forEach((b) => b.remove());
		endTime = getTargetTime(working ? workTime : restTime);
		buttons = [
			makeButton(
				"Reset",
				(currentButtonsAmount = modes.length),
				resetProgram
			),
		];

		soundEffect.play();

		doOnce = false;
	}

	background(working ? color(0, 255, 0) : color(64, 64, 255));

	timeLeft = getTimeDifference(getTime(), endTime);

	if (timeLeft[2] <= 0) {
		//negative seconds left
		working = !working; //switch modes
		doOnce = true; //recalculate time to finish
	}

	const currentTimeInfo = new TimeInformation(
		working,
		workTime,
		restTime,
		timeLeft
	);
	
	theText = standardText(timeFormatter.textFrom(currentTimeInfo));
}

function standardText(txt) {
	return text(txt, windowWidth / 2, windowHeight / 2);
}

/**
 * Creates a list of buttons from a list of timer modes. Each button will start the corresponding mode when clicked.
 * @param {string[]} modes - List of timer modes that the buttons should start.
 * @returns {Button[]} The list of buttons that start the timer with their mode.
 */
function makeButtonsFromModes(modes) {
	return modes
		.map(createButton)
		.map((b, idx) =>
			b.position(
				windowWidth / 2 - buttonWidth / 2,
				windowHeight / 2 +
					idx * buttonHeight -
					(modes.length * buttonHeight) / 2
			)
		)
		.map((b) => b.size(buttonWidth, buttonHeight))
		.map((b, idx) => b.mousePressed(() => setMode(modes[idx])));
}

/**
 * Creates a button on the screen.
 * @param {string} txt - The text on the button
 * @param {number} totalButtons - The intended total number of buttons
 * @param {() => void} mPressed - The callback to be ran when the button is clicked
 * @returns
 */
function makeButton(txt, totalButtons, mPressed) {
	//currentButtonsAmount=the current number of buttons on screen before creation of this one
	var button = createButton(txt);
	button.position(
		windowWidth / 2 - buttonWidth / 2,
		windowHeight / 2 +
			currentButtonsAmount * buttonHeight -
			(totalButtons * buttonHeight) / 2
	);
	button.size(buttonWidth, buttonHeight);
	button.mousePressed(mPressed); //function

	currentButtonsAmount++;

	return button;
}

/**
 * Gets the time, in seconds, since the start of the program.
 * @returns The time, in seconds, since the start of the program.
 */
function getTime() {
	return millis() / 1000;
}

/**
 * Returns how long the program will have ran for some number of minutes in the future.
 * Or, time in seconds from `setup()` to target time.
 * @param {number} mins - The number of minutes in the future .
 * @returns {number} How long the program would have ran `mins` minutes in the future, in seconds.
 */
function getTargetTime(mins) {
	return getTime() + mins * 60;
}

/**
 * Returns the difference in time between `current` and `target` in hours, minutes, and seconds.
 * @param {number} current - The current time, in seconds
 * @param {number} target - The target time, in seconds
 * @returns {number[]} An array of numbers, where element 0 is hours, 1 is minutes, 2 is seconds.
 */
function getTimeDifference(current, target) {
	// TODO: #1 Change this to return a more appropriate structure, maybe object.

	const diff = target - current;

	return [
		Math.floor(diff / 60 / 60), // Hours
		Math.floor(diff / 60), // Minutes
		diff.toFixed(2), // Seconds to two decimal places
	];
}

window.setup = setup;
window.mouseClicked = mouseClicked;
window.draw = draw;
