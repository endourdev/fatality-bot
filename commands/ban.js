const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Ban un utilisateur")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option =>
            option.setName("utilisateur")
                .setDescription("User to be banned.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("raison")
                .setDescription("Raison du ban")
        ),

    async execute(interaction) {
        const { channel, options } = interaction;

        const user = options.getUser("utilisateur");
        const reason = options.getString("raison") || "Pas de raison fournie.";

        const member = await interaction.guild.members.fetch(user.id);

        const errEmbed = new EmbedBuilder()
            .setDescription(`Vous ne pouvez ban ${user.username} car il à un rôle plus haut.`)
            .setColor(0xc72c3b);

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        await member.ban({ reason });

        const embed = new EmbedBuilder()
            .setDescription(`${user} à été banni avec succés avec la raison : ${reason}`)
            .setColor(0x5fb041)
            .setTimestamp()
            .setFooter({ text: '🎮・Fatality Bot\'s'});

        await interaction.reply({
            embeds: [embed]
        });
    }
}