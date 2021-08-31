const { MessageButton, MessageEmbed, MessageActionRow } = require('discord.js');
const config = require('../../config.json');
module.exports = {
	name: 'invite',
	description: 'Support the bot!',

	run: async (client, interaction) => {

		const embed = new MessageEmbed()
			.addField(`**${client.user.username}**`, `All these links helps me grow!`);

		const btnBuy = new MessageButton()
			.setLabel('Donate!')
			.setStyle('LINK')
			.setURL(config.donatelink);

		const btnInvite = new MessageButton()
			.setLabel('Invite me!')
			.setStyle('LINK')
			.setURL(config.invitelink);

		const btnJoin = new MessageButton()
			.setLabel('Support server!')
			.setStyle('LINK')
			.setURL(config.supportserver);

		interaction.followUp({ embeds: [embed], components: [new MessageActionRow().addComponents([btnInvite, btnBuy, btnJoin])] });
	},
};
