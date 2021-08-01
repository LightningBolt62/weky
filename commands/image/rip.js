

const Discord = require('discord.js');
const config = require('../../util/config.json');
const canvacord = require('canvacord');

module.exports.run = async (client, message, args, utils, data) => {
  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]) || message.member;
  let avatar = member.user.displayAvatarURL({ format: 'jpg' })
  let image = await canvacord.Canvas.rip(avatar)
  let attachment = new Discord.MessageAttachment(image, "rip.png")
  message.channel.send(attachment)
};

module.exports.help = {
  aliases: [],
  name: 'rip',
  description: 'Putting your pfp in a R.I.P Stone.',
  usage: config.prefix + 'rip {none OR @user}',
};

module.exports.config = {
  args: false,
  restricted: false,
  category: 'image',
  disable: false,
  cooldown: 1000,
};