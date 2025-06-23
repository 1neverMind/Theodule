const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('oye')
		.setDescription('oye oye oye'),
	async execute(interaction) {
		await interaction.reply('oye oye oye');
	},
};