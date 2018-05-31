"use strict";

var signals = require("./signals"),
	Signal = signals.Signal,
	Receiver = signals.Receiver;

// New tick signal that can be sent to a receiver.
var tick = new Signal("tick");

// New process which send the tick signal 
// to a receiver every second.
function Ticker(receiver) {	
	setInterval(function() {
		tick.send(receiver);
	}, 1000);
}

// A clock receiver which when sent a tick
// signal will print out either tick or tock
// depending on which was printed last.
var clock = new Receiver("clock");
clock.ticked = false;
var ticks = 0;

clock.on("tick", function() {
    var vowel = clock.ticked ? "O" : "I";
	// var char = clock.ticked ? '/' : '\\';
	var chars = ['-', '\\', '|', '/'];
	// var char = chars[clock.ticks % 4];
	var char = chars[ticks % 4];
	process.stdout.write("\b\b\b\b\b\b" + char + " T" + vowel + "CK");
	ticks += 1;
	clock.ticked = !clock.ticked;
});

clock = new Ticker(clock);
