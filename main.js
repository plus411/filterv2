const Discord = require('discord.js');
const bot = new Discord.Client();
const cmdProcess = require('./command.js');
const group = require('./group.js');
const embed = require('./embed.js');
const dm = require('./direct.js');
const dice = require('./dice.js');
const admin = require('./autoadmin.js');
const db = require('./db.js');
const react = require('./autoreact.js');

var options

bot.on('ready', () => {
	console.log('Tank Filled!');
});

bot.on('message', message => {
	var command = cmdProcess.makeCommand(message.content);
	var cmdRaw = cmdProcess.makeCommand(message.content, true);

	if (command === options.prefix) {message.channel.send('Filtering Tank!');}

	if (command[0] == options.prefix) {

		if (message.guild !== null) {
			switch (command[1]) {
				case 'join':
					group.group(message, command, cmdRaw, options);
				break;

				case 'leave':
					group.group(message, command, cmdRaw, options);
				break;

				case 'rules':
					dm.rules(message);
				break;

				case 'roll':
					dice.roll(command,message);
				break;

				case 'embed':
					embed.send(message);
				break;

				case 'voice':
					//channels.channelmod(message,command);
				break;

				case 'poll':
					react.poll(message);
				break;
			}
		}
	}

	switch (command[1]) {
		case 'report':
			admin.report(message, bot);
		break;
	}


		if (options.adminlog)  { admin.log(message); }
});

bot.on('voiceStateUpdate', (oldState, state) => {
  if (state.voiceChannel != undefined) {
    state.addRole(state.guild.roles.find('name', 'Voice'));
  } else {
    state.removeRole(state.guild.roles.find('name', 'Voice'));
 }
});

var settings = db.loadSettings((settings) => {
	options = settings;
	console.log('Settings loaded, logging in!');
	bot.login(settings.token);
	console.log('Settings: ' + settings)
});


