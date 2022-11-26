const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("poll")
        .setDescription("Créer un sondage")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option.setName("description")
                .setDescription("Décrivez le sondage.")
                .setRequired(true)
        )
        .addChannelOption(option =>
            option.setName("salon")
                .setDescription("Ou le sondage sera envoyé")
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)
        ),
    async execute(interaction) {
        const { options } = interaction;

        const channel = options.getChannel("salon");
        const description = options.getString("description");

        const embed = new EmbedBuilder()
            .setColor("Gold")
            .setDescription(description)
            .setTimestamp()
            .setFooter({ text: '🎮・Fatality Bot\'s'});

        try {
            const m = await channel.send({ embeds: [embed] });
            await m.react("✅");
            await m.react("❌");
            await interaction.reply({ content: "Sondage créer avec succés", ephemeral: true });
        } catch (err) {
            console.log(err);
        }
    }
}