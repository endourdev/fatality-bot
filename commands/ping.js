const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription("Affiche le ping du bot"),
	async execute(interaction) {
        const sent = await interaction.reply({ content: 'Ping en cours', fetchReply: true });
        const exampleEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle(`🎮・Fatality Bot Ping\'s`)
    .addFields(
        { name: 'Ping :', value: `Latence : ${sent.createdTimestamp - interaction.createdTimestamp}ms` },
    )
    .setTimestamp()
    .setFooter({ text: '🎮・Fatality Bot\'s'});

    await interaction.editReply({ content: " ", embeds: [exampleEmbed]});
	},
};