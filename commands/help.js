const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription("Affiche toute les commandes du bot."),
	async execute(interaction) {
        const embed = new EmbedBuilder() .setColor(0x0099FF) .setTitle("🎮・Fatality Bot Help\'s") .setDescription(`

__Utilitaires__ :

> Avatar : Permet d'afficher l'avatar d'une personne.

> Ping : Permet de voir la latence du bot.

> Server : Permet de voir les informations basique d'un serveur.

> Update : Permet d'afficher les prochaines mise à jours.

__Modération__ :

> De nouvelles commandes de modération arrive`)
    .setTimestamp()
    .setFooter({ text: '🎮・Fatality Bot\'s'});

        // interaction.guild is the object representing the Guild in which the command was run
        await interaction.reply({embeds: [embed]} );
    },
};