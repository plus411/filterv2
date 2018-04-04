// autoadmin.js
// Used to do automatic administraion of the server
var history = [];

module.exports = {
    log: function(message) {
        if (message.guild) {
            if (message.channel != message.guild.channels.find('name', 'adminlog')) {
                message.guild.channels.find('name', 'adminlog').sendMessage(message.channel + ' : ' + message.author.username + "#" + message.author.discriminator + ' : ' + message.content);
                if (message.attachments.first()) { message.guild.channels.find('name', 'adminlog').send(message.attachments.first().url); }
            }
        }
    },

    report: function(message, bot) {
        bot.guilds.find('name', 'The Aquarium').channels.find('name', 'reports').send(`${message.author} : ${message.content}`);

        if (message.attachments.first()) { bot.guilds.find('name', 'The Aquarium').channels.find('name', 'reports').send(message.attachments.first().url) }
    },

    restrict: function(message, time, settings) {
        let seconds = time * 60;
        let milliseconds = seconds * 1000;

        message.member.addRole(message.guild.roles.find('name', settings.role));

        setTimeout((message) => {
            message.member.removeRole(message.guild.roles.find('name', settings.role));
        }, milliseconds, message);
    },

    despam: function(message, settings) {
        if (message.author.bot) { return; }
        if (message.channel.name === 'filtertesting') {
            return;
        }

        // if (history.some(e => { return e.content ===  message.content})) {
        //     module.exports.restrict(message, 5, settings);

        //     message.guild.channels.find('name', 'naughty-log').send(`${message.author}, slow down! Nobody like's spamming. How about you chill out here for **5 minutes** then you can have another shot at chatting like a big boy. Okay?`);
        // }

        var instances = 0;

        history.forEach(element => {
            if (element.content === message.content) {
                instances = instances + 1;
                console.log(instances);
            }
        });

        if (instances > 1) {
            module.exports.restrict(message, 5, settings);

            message.guild.channels.find('name', 'naughty-log').send(`${message.author}, slow down! Nobody like's spamming. How about you chill out here for **5 minutes** then you can have another shot at chatting like a big boy. Okay?`);
        }

        history.unshift(message);

        if (history.length > settings.history - 1) { history.pop() }
    },

    scrub: function(message, settings) {
        if (message.author.bot) { return; }

        if (message.content.includes('discord.gg') ) {
            module.exports.restrict(message, 5, settings);

            message.guild.channels.find('name', 'naughty-log').send(`Hey! ${message.author}, I see you posting discord links without permission! That's 5 minutes in the corner to think about what you did.`);

            message.delete();
        }

        if (message.mentions.members.array().length > 4) {
            module.exports.restrict(message, 10, settings);
            message.guild.channels.find('name', 'naughty-log').send(`Woah there ${message.author}, that's a lot of mentions you've got there. Let's cool off for 10 minutes.`);
        }

        if (message.mentions.members.array().length > 99) {
            module.exports.restrict(message, 1209600, settings);
            message.guild.channels.find('name', 'naughty-log').send(`Over 100 pings? Really? How about you sit tight for a bit until a @Great Lotls can come and sort this out. ${message.author}.`);
        }
    }
}