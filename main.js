var pomodoromode = false;
var modes = ["60x60", "25x25", "45x10", "1x1", "0.1x1", "90x90"]; //add modes here
var buttons = [];
var work, rest;
var working = true; //false=resting
var currentButtonsAmount = 0;
var buttonWidth, buttonHeight; //global
var startTime;
var endTime;
var doOnce = false; //for pomodoro screen
var theText; //for pomodoro screen - global
var timeMode = 1; //0=1hours,60minutes,3600seconds / 1=1hours,0minutes,0seconds
var timeLeft;
var _reset = false;
var soundEffect;

function setup() {
	buttonWidth = windowWidth / 5;
	buttonHeight = windowHeight / 10;

	createCanvas(windowWidth, windowHeight);

	soundEffect = loadSound("sound effect.mp3");
	//setup screen
	background(200);

	textAlign(CENTER);

	buttons = createButtonsFromModes(modes);
}

function draw() {
	if (_reset) drawReset();
	if (pomodoromode) pomodoro(work, rest);
}

function drawReset() {
	//executes once to reset program
	buttons.forEach((b) => b.remove());
	pomodoromode = false;
	timeMode = 1;
	clear();
	//setup screen
	background(200);

	textAlign(CENTER);

	buttons = createButtonsFromModes(modes);
	_reset = false;
}

function mouseClicked() {
	if (pomodoromode) timeMode = !timeMode;
}

/**
 * Makes one button to start the timer with the specified mode and destroys all other buttons.
 * @param {string} mode - The timer mode, formatted like so: `"<Work time>x<Rest time>"`
 */
function setMode(mode) {
	work = mode.substring(0, mode.indexOf("x"));
	rest = mode.substring(mode.indexOf("x") + 1);

	buttons.forEach((b) => b.remove());

	buttons[0] = makeButton("start", currentButtonsAmount = 1, () => (doOnce = pomodoromode = true));
}

/**
 * Updates the screen to show the proper text about time left in a session.
 * @param {number} _work - The time to spend working
 * @param {number} _rest - The time to spend resting
 */
function pomodoro(_work, _rest) {
	textSize((windowWidth + windowHeight) / 2 / 25);

	if (doOnce) {
		buttons.forEach((b) => b.remove());
		startTime = getTime();
		endTime = getTargetTime(working ? _work : _rest);
		currentButtonsAmount = 6;
		buttons[0] = makeButton("Reset", 6, () => (_reset = true));

		soundEffect.play();

		doOnce = false;
	}

	background(working ? color(0, 255, 0) : color(0, 0, 255));

	timeLeft = getTimeDifference(getTime(), endTime);

	if (timeLeft[2] <= 0) {
		//negative seconds left
		working = !working; //switch modes
		doOnce = true; //recalculate time to finish
	}
	if (timeMode == 0) {
		//set text based on display mode
		theText = text(
			(working ? "Working" : "Resting") +
			" for " +
			(working ? _work : _rest) +
			" minutes. \n" +
			timeLeft[0] +
			" hours remaining. \n" +
			timeLeft[1] +
			" minutes remaining. \n" +
			timeLeft[2] +
			" seconds remaining. \n",
			windowWidth / 2,
			windowHeight / 2
		);
	} else {
		//=1
		var secondsfixed = timeLeft[2] >= 60 ? timeLeft[2] % 60 : timeLeft[2];
		secondsfixed = parseFloat(secondsfixed).toFixed(2);
		theText = text(
			(working ? "Working" : "Resting") +
			" for " +
			(working ? _work : _rest) +
			" minutes. \n" +
			timeLeft[0] +
			" hours and\n" +
			(timeLeft[1] >= 60 ? timeLeft[1] % 60 : timeLeft[1]) +
			" minutes and\n" +
			secondsfixed +
			" seconds remaining. \n",
			windowWidth / 2,
			windowHeight / 2
		);
	}
}

/**
 * Creates a list of buttons from a list of timer modes. Each buttonwill start the corresponding mode when clicked.
 * @param {string[]} modes - List of timer modes that the buttons should start.
 * @returns {Button[]} The list of buttons that start the timer with their mode.
 */
function createButtonsFromModes(modes) {
	return modes
		.map(createButton)
		.map((b, idx) => b.position(
			windowWidth / 2 - buttonWidth / 2,
			windowHeight / 2 + idx * buttonHeight - (modes.length * buttonHeight) / 2))
		.map(b => b.size(buttonWidth, buttonHeight))
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
 * @returns {Array} An `Array`, where element 0 is hours, 1 is minutes, 2 is seconds.
 */
function getTimeDifference(current, target) {
	// TODO: #1 Change this to return a more appropriate structure, maybe object.

	const diff = target - current;

	return [
		Math.floor(diff / 60 / 60), // Hours
		Math.floor(diff / 60),      // Minutes
		diff.toFixed(2),            // Seconds to two decimal places
	];
}
