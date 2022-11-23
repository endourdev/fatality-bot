const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Envoie l\'avatar d\'un utilisateur.')
        .addUserOption(option => option.setName("utilisateur").setDescription("Utilisateur que vous souhaitez mentionner").setRequired(false)),
    async execute(interaction) {
        if(interaction.commandName === "avatar"){
            let user = interaction.options.getUser("utilisateur")
            if(user != undefined){
            const avatars = new EmbedBuilder()
    .setTitle("🎮・Chill Bot Avatar")
    .setColor('#0099ff')
    
    .setFooter({ text: '🎮・Chill Bot\'s'})
    .setDescription('Voici l\'avatar demandé :')
    .setImage(user.displayAvatarURL({dynamic: true}))
    .setTimestamp()

interaction.reply({ embeds: [avatars]}),{}
            }else {
                const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    // .setCustomId('link')
                    .setLabel('Télécharger Ici')
                    .setStyle(ButtonStyle.Link)
                    .setURL(interaction.user.displayAvatarURL({dynamic: true})),
            );
                const avatard = new EmbedBuilder()
    .setTitle("🎮・Chill Bot Avatar")
    .setColor('#0099ff')
    
    .setDescription('Voici votre avatar :')
    .setImage(interaction.user.displayAvatarURL({dynamic: true}))
    .setTimestamp()
    .setFooter({ text: '🎮・Chill Bot\'s'});

interaction.reply({ embeds: [avatard], components: [row] });

            }
    }
}}