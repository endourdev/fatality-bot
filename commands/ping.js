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
    // .setThumbnail('https://cdn.discordapp.com/avatars/1041409110056382494/3de5e5286ad94e0d3823cdcb6a671e3a.webp?size=128')
    .addFields(
        { name: 'Ping :', value: `Latence : ${sent.createdTimestamp - interaction.createdTimestamp}ms` },
    )
    .setTimestamp()
    .setFooter({ text: '🎮・Fatality Bot\'s'});

    await interaction.editReply({ content: " ", embeds: [exampleEmbed]});

		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		// await interaction.reply(`Cette commande à été faite par ${interaction.user.username}, qui à rejoint le ${interaction.member.joinedAt}.`);
        // const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
        // interaction.editReply(`Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
	},
};