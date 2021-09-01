const { MessageEmbed } = require('discord.js');
const os = require('os');
const getpercentage = ((os.freemem() / os.totalmem()) * 100).toFixed(2) + '%';
module.exports = {
	name: 'info',
	description: 'See bot\'s info!',

	run: async (client, interaction, _args, utils) => {

		const prettyMs = require('pretty-ms');
		const msg = await interaction.followUp('Loading...').then(m => m.delete(), 1000);

		const embed = new MessageEmbed()
			.setAuthor(`${client.user.username} stats`)
			.addField('__Cache__\n', `**Guilds**: ${client.guilds.cache.size} \n**Users**: ${client.users.cache.size}\n\n`, true)
			.addField('__Uptime__\n', `**Bot**: ${client.uptime}\n**Process**: ${prettyMs(process.uptime() * 1000)}`, true)
			.addField('__Movement__\n', `**API Latency**: ${Math.round(client.ws.ping)}\n**Bot Latency**: ${msg.createdTimestamp - interaction.createdTimestamp}ms`, true)
			.addField('__Hosting__\n', `**CPU**: ${os.cpus()[0].model}\n**Platform**: ${os.platform()}\n**RAM**: ${getpercentage} \`|\` ${(os.freemem / 1024 / 1024).toFixed(2)} MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true);

		interaction.followUp({ embeds: [embed] });
	},
};
