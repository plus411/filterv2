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

    despam: function(message, settings) {
        if (message.author.bot) { return; }

        if (history.some(e => { return e.content ===  message.content})) {
            message.member.addRole(message.guild.roles.find('name', settings.role));
            message.guild.channels.find('name', 'naughty-log').send(`${message.author}, slow down! Nobody like's spamming. How about you chill out here for **5 minutes** then you can have another shot at chatting like a big boy. Okay?`);

            setTimeout((message) => {
                message.member.removeRole(message.guild.roles.find('name', settings.role));
            }, 300000, message)
        }

        history.unshift(message);

        if (history.length > settings.history - 1) { history.pop() }
    }
}