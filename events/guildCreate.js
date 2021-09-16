const config = require('../config.json');
module.exports = async (client, guild) => {
	await client.channels.cache.get(config.guildcreate).send(
		'```md\n# Guild\n' + guild.name +
		'\n# Members\n' + guild.memberCount + '\n> ' +
		client.guilds.cache.size + ' servers```');
};
