const config = require('../../util/config.json');

module.exports.run = async (client, message, args) => {
  const msg = args.slice(0).join(' ');
  if (!msg) return message.channel.send({ content: 'I can\'t reverse nothing bruh' });
  if (msg.includes('@')) return message.channel.send({ content: 'I will eat your toes.' });

  return message.channel.send({ content: `**Original:** ${msg}\n\n**Reversed:** ${msg.split('').reverse().join('')}` });

};

module.exports.help = {
  aliases: [],
  name: 'reverse',
  description: 'Reversing letters.',
  usage: config.prefix + 'reverse %text%',
};

module.exports.config = {
  args: false,
  restricted: false,
  category: 'fun',
  disable: false,
  cooldown: 1000,
};

