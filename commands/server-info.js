const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server-info')
        .setDescription('Voir les statistiques basique d\'un serveur.'),
    async execute(interaction) {
    const embed = new EmbedBuilder() .setColor(0x0099FF) .setTitle("🎮・Chill Bot Server-Info") .setDescription(`

Serveur Information:

> Name : ${interaction.guild.name}

> ID : ${interaction.guild.id}

> Description: ${interaction.guild.description}

> Créateur: <@${interaction.guild.ownerId}>

> Boost: ${interaction.guild.premiumSubscriptionCount}

> Créer le : ${interaction.guild.createdAt}

> Vérification: ${interaction.guild.verificationLevel}

**__Membre Information__**

> Bot(s): Indisponible

> Utilisateur(s): ${interaction.guild.memberCount}`)
    .setTimestamp()
    .setFooter({ text: '🎮・Chill Bot\'s'});

        // interaction.guild is the object representing the Guild in which the command was run
        await interaction.reply({embeds: [embed]} );
    },
};