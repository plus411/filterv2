// Direct.js
// Used for controling direct messages to players.

const Discord = require('discord.js');

var rules = [
	'**Welcome to The Aquarium**', 'In order for everone to have the best time possible there are some rules we need to put into place.',
	' ',
	'**No spamming.** Multiple messages in quick succession, especially for the purpose of disrupting the chat and causing chaos, will not be tolerated.',
	' ',
	'**No advertising.** Please do not post links or advertisements in any of the chats without prior approval from one of the “Great Lotls.” This includes instant invites to other discord servers, twitch streams, and youtube accounts. *We do want to promote your content, but we need to keep spam and unrelated advertisements to a minimum, so please ask!*',
	' ',
	'**No illegal or obscene content.** Adult content is not acceptable. Illegal content will be reported to the appropriate authorities.',
	' ',
	'**Keep discussion to the relevant channel.** Please attempt to keep your discussions to the relevant channels. #general for normal conversation, #events for talking about the events we do, #derpwatch for overwatch and non-minecraft related games, #filtertesting for filter commands, #cultchat for nothing, and #saltwater for general shitposting and inappropriate content.',
	' ',
	'**Refrain from being too immature.** Do not act in such a way as to make another user especially uncomfortable or be extremely bothersome. Keep toxic behavior to a minimum. Either over text or voice, comments intended to harass or bother other users are not welcome.',
	' ',
	'**Reporting**',
	'Should you feel another user is in voilation of any of these rules please do not start an argument in chat. Instead, report them to the administration by sending a *private message* to the bot *@Filter#7742* with the contents: `filter report <Name of offending player>. <Description of rules broken>. <Screenshots, videos, recordings, or other evidence that may be of use.>`'

];

module.exports = {
	rules: function (message) {
		message.author.sendMessage(rules);
		message.channel.sendMessage('Thank you, I do! If you would like to read the rules too you can type "filter rules"!');
	}
}
