const util = require('util');
const { glob } = require('glob');
const globPromise = util.promisify(glob);
const express = require('express');
const top = require('top.gg-core');
const config = require('../config.json')
const webhook = new top.Webhook(process.env.topggPass);
const { MessageEmbed } = require('discord.js');
const app = express();
const utils = require('../util/utils');

module.exports = async (client) => {
	client.user.setActivity(`in ${client.guilds.cache.size} servers! | wek invite`, { type: 'PLAYING' });

	// FETCHING
	console.log('\x1b[31m', 'Fetching members...');
	for (const [id, guild] of client.guilds.cache) {
		await guild.members.fetch();
	}
	console.log('\x1b[32m', 'Fetched members.');

	// SLASH COMMANDS
	const slashCommands = await globPromise(
		`${process.cwd()}/slashcommands/*/*.js`,
	);

	const arrayOfSlashCommands = [];
	slashCommands.map((value) => {
		const file = require(value);
		if (!file.name) return;
		client.slashCommands.set(file.name, file);
		arrayOfSlashCommands.push(file);
	});

	await client.application.commands.set(arrayOfSlashCommands);
	
	// Home Page
	app.get('/', async(req, res) => {
		res.send({success:true})
	})
	
	// TOP.GG
	app.post('/tog-gg', webhook.advanced(), async (req) => {
		const user = await client.users.cache.get(req.vote.user);
		const embed = new MessageEmbed()
			.setAuthor(client.user.username, client.user.displayAvatarURL(), `https://top.gg/bot/${client.user.id}/vote`)
			.setURL(`https://top.gg/bot/${client.user.id}/vote`)
			.setColor('#ffd984')
			.setThumbnail(user.displayAvatarURL())
			.setDescription(`**${user.tag}** (${user.id}) just voted for me! They've got their rewards!`)
			.setTimestamp();
		client.channels.cache.get(config.votelog).send({ embeds: [embed] });
		try {
			user.send(`Thanks for voting for me!\nYou received ** 4,000 ${utils.emojis.aero}**, **1 ${utils.emojis.Beryl}**, **3 ${utils.emojis.Jadeite}**!`);
		}
		catch(err) {
			return;
		}
		client.data.modify(user.id, 'Beryl', 1, '+=');
		client.data.modify(user.id, 'Jadeite', 3, '+=');
		client.data.addAero(user.id, 4000);
	});

	app.listen(process.env.SERVER_PORT, () => {
		console.log(`Weky listening on port ${process.env.SERVER_PORT}`);
	});
};
