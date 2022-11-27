const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Expulse un membre du serveur.")
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption(option =>
            option.setName("utilisateur")
                .setDescription("Utilisateur qui doit être expulser.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("raison")
                .setDescription("Raison du kick.")
        ),

    async execute(interaction) {
        const { channel, options } = interaction;

        const user = options.getUser("utilisateur");
        const reason = options.getString("raison") || "Aucune raison fournie.";

        const member = await interaction.guild.members.fetch(user.id);

        const errEmbed = new EmbedBuilder()
            .setDescription(`Vous ne pouvez pas expluser ${user.username} car son rôle est supérieur à toi.`)
            .setColor(0xc72c3b)

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        await member.kick(reason);

        const embed = new EmbedBuilder()
            .setDescription(`${user} à été expulsé avec succés pour ${reason}`)
            .setImage('https://tenor.com/view/kiss-gif-22640695')

        await interaction.reply({
            embeds: [embed], ephemeral:true
        });
    }
}