// signals.js

function Signal(name) {
	this.name = name;
	
	this.send = function(receiver) {
		receiver.signals.push(this.name);
	};
}

function Receiver(name) {
	this.name = name;
	this.signals = [];
	
	this.on = function(signal, callback) {
		var signals = this.signals;
		
		setInterval(function() {
			var lastSignal = signals.pop();
			
			if (signal === lastSignal) {
				callback();
			} else if (lastSignal) {
				signals.push(lastSignal);
			}
		}, 1);
	};
}

exports = module.exports = {
	Signal: Signal,
	Receiver: Receiver
};
