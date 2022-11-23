const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('update')
		.setDescription("Affiche les futute mise à jours"),
	async execute(interaction) {
        const exampleEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle(`🎮・Chill Bot Update\'s`)
    // .setThumbnail('https://cdn.discordapp.com/avatars/1041409110056382494/3de5e5286ad94e0d3823cdcb6a671e3a.webp?size=128')
    .addFields(
        { name: 'Mise A Jour :', value: `Une commande userinfo arrive bientôt` },
        { name: 'ServerInfo :', value: `Refonte compléte de toutes les commandes.` },
    )
    .setTimestamp()
    .setFooter({ text: '🎮・Chill Bot\'s'});

    await interaction.reply({embeds: [exampleEmbed]});

		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		// await interaction.reply(`Cette commande à été faite par ${interaction.user.username}, qui à rejoint le ${interaction.member.joinedAt}.`);
        // const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
        // interaction.editReply(`Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
	},
};