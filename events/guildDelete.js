const config = require('../config.json');
module.exports = async (client, guild) => {
	if(guild.name == undefined) return;
	await client.channels.cache.get(config.guilddelete).send('```cs\n# Guild\n' + guild.name +
	'\n# Members\n' + guild.memberCount + '\n> ' +
	client.guilds.cache.size + ' servers```');
};
