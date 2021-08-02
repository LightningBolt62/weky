

const Discord = require('discord.js');
const config = require('../../util/config.json');

module.exports.run = async (client, message, args, utils, data) => {
  const { Util, MessageEmbed } = require("discord.js");
  const { parse } = require("twemoji-parser");
  if (!message.member.hasPermission("MANAGE_EMOJIS")) return utils.errorEmbed('You don\'t have the permissions to manage emojis')
  const emoji = args[0];
  const name = args.slice(1).join(" ");

  if (!emoji) {
    return utils.errorEmbed(message, `Please Give Me A Emoji!`);
  }
  if (!name) {
    return utils.errorEmbed(message, `No emoji name specified`)
  }
  try {
    if (emoji.startsWith("https://cdn.discordapp.com")) {
      const fb = await message.guild.emojis.create(emoji, name || name);

      return message.channel.send('<:' + Util.parseEmoji(fb).name + ':' + Util.parseEmoji(fb).id + `> has been added as \`${name}\``);
    }

    const customEmoji = Util.parseEmoji(emoji);

    if (customEmoji.id) {
      const link = `https://cdn.discordapp.com/emojis/${customEmoji.id}.${customEmoji.animated ? "gif" : "png"}`;

      let fb = await message.guild.emojis.create(`${link}`, `${name || `${customEmoji.name}`}`);
      return message.channel.send('<:' + Util.parseEmoji(fb).name + ':' + Util.parseEmoji(fb).id + `> has been added as \`${name}\``);
    } else {
      message.channel.send("I can't work with this!");
    }
  } catch (e) {
    if (
      String(e).includes("DiscordAPIError: Maximum number of emojis reached (50)")) {
      return utils.errorEmbed(message, "Maximum emoji count reached for this Server!");
    }
  }
};

module.exports.help = {
  aliases: ['ae'],
  name: 'addemoji',
  description: 'Add a emoji',
  usage: config.prefix + 'addemoji %link%',
};

module.exports.config = {
  args: false,
  restricted: false,
  category: 'utility',
  disable: false,
  cooldown: 1000,
};