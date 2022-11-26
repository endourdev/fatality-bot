const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clear a specific amount of messages from a target or channel.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption(option =>
        option.setName('montant')
        .setDescription('Montant de message à supprimer')
        .setMinValue(1)
        .setMaxValue(99)
        .setRequired(true)
        )
    .addUserOption(option =>
        option.setName('utilisateur')
        .setDescription('Sélectionnez un utilisateur pour supprimer ses messages.')
        .setRequired(false)
        ),

    async execute(interaction) {
        const {channel, options} = interaction;

        const amount = options.getInteger('montant');
        const target = options.getUser("utilisateur");

        const messages = await channel.messages.fetch({
            limit: amount +1,
        });

        const res = new EmbedBuilder()
            .setColor(0x5fb041)

        if(target) {
            let i = 0;
            const filtered = [];

            (await messages).filter((msg) =>{
                if(msg.author.id === target.id && amount > i) {
                    filtered.push(msg);
                    i++;
                }
            });

            await channel.bulkDelete(filtered).then(messages => {
                res.setDescription(`Message de ${target} supprimer avec succés`);
                interaction.reply({embeds: [res]}); // you can use ephemeral if you desire
            });
        } else {
            await channel.bulkDelete(amount, true).then(messages => {
                res.setDescription(`${messages.size} messages on été effacé avec succés.`);
                interaction.reply({embeds: [res]});
            });
        }
    }
}
