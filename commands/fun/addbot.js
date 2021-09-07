const Discord = require('discord.js');
const config = require('../../util/config.json');

module.exports.run = async (client, message, args) => {
	if (message.guild.id !== '830003680983646278') return;

	if(!message.member.roles.cache.has('848576232739962881')) return message.reply('Sorry! You need the Booster role to access this command :)');
	if (!args[0] || args[0].length !== 18) return message.reply('Please specify the bot\'s id, example here: `wek addbot 123456789123456789 c? A very cool bot it has many futures add it now also check github to check if its safe discord.gg/ rickroll here`');
	if (!args[1]) return message.reply('Please specify the bot\'s prefix, example here: `wek addbot 123456789123456789 c? A very cool bot it has many futures add it now also check github to check if its safe discord.gg/ rickroll here`');
	if (!args.slice(2).join(' ')) return message.reply('Please specify the bot\'s description, as many characters as you can, example here: `wek addbot 123456789123456789 c? A very cool bot it has many futures add it now also check github to check if its safe discord.gg/ rickroll here`');

	client.users.cache.get('778518819055861761').send({ embeds: [
		new Discord.MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL())
			.setDescription('New bot has been subtimed in **Weky Development** by the user displayed up, their bot id is `' +
                args[0] + '` and their description is ```\n' +
                args.slice(2).join(' ') + '\n``` Their bot prefix is also `' + args[1] + '`! Btw user id is ' + message.author.id),
	] });
};

module.exports.help = {
	aliases: [],
	name: 'addbot',
	description: 'Submit your bot to be added in Weky Development.',
	usage: config.prefix + 'wek addbot 123456789123456789 c? A very cool bot it has many futures add it now also check github to check if its safe discord.gg/ rickroll here',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'fun',
	disable: false,
	cooldown: 100000,
};
