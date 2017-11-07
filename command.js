// command.js
// Used to seperate out text from a command into an array

module.exports = {
	makeCommand: function(command, raw, array) {
		command = command.replace(/[\r|\n]+/g, ' ')
		if (!raw) { command = command.toLowerCase() }
		if (array == false) { return command } 
		else { 
		  commandArray = command.split(' ');
			if (commandArray.length > 1) { return commandArray }
			else { return command }
		}
	}
}
