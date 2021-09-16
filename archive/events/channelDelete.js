module.exports = async (client, channel) => {
	const schema = require('../schemas/Guild');

	await schema.findOne({ id: channel.guild.id }, async (err, dat) => {
		console.log(dat.amogus.isThereAlreadyAGame);
		if (dat.amogus.isThereAlreadyAGame === true) {
			dat.amogus.isThereAlreadyAGame = false;
			dat.amogus.whoIsInGame = {};
			dat.amogus.inWhatChannel = null;

			delete client.tempCollector[dat.amogus.impostorGame];

			dat.amogus.impostorGame = null;
			await schema.findOneAndUpdate({ id: channel.guild.id }, dat, { upset: true });
		}
	});
};
