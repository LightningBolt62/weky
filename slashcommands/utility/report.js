const { MessageEmbed, MessageButton } = require('discord.js');
const config = require('../../config.json');
module.exports = {
	name: 'report',
	description: 'Report a bug in the bot!',
	options: [
		{
			type: 'STRING',
			description: 'The bug you want to report',
			name: 'bug',
			required: true,
		},
	],

	run: async (client, interaction, args) => {
		const channel = client.channels.cache.get(config.bugreport);

		const btn = new MessageButton()
			.setLabel('Support server!')
			.setStyle('url')
			.setURL(config.supportserver);

		const embed = new MessageEmbed()
			.setTitle('New Bug!')
			.addField('Author', interaction.user.tag, true)
			.addField('Guild', client.guilds.cache.get(interaction.guildId).name, true)
			.addField('Report', args[0])
			.setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
		channel.send({ embeds: [embed] });
		interaction.followUp({
			content: '**Bug report has been sent!**\nJoin here if you want to see it',
			components: [{
				type: 1,
				components: [btn],
			}],
		});
	},
};
