const Discord = require('discord.js');
const config = require('../../util/config.json');

module.exports.run = async (client, message, args) => {
	const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;
	const avatar = member.user.displayAvatarURL({ format: 'jpg' });
	const att = `https://api.monkedev.com/other/gav?key=scNyfoysHunZd79reAL5VEsQV&imgUrl=${avatar}`;
	const attachment = new Discord.MessageAttachment(att, 'bird.jpg');
	message.channel.send({ files: [attachment] });
};

module.exports.help = {
	aliases: [],
	name: 'bird',
	description: 'Transforming your pfp in a bird.',
	usage: config.prefix + 'bird {none OR @user}',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'image',
	disable: false,
	cooldown: 1000,
};