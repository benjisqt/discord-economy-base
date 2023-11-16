const { Client, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'interactionCreate',

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */

    async execute(interaction, client) {
        const command = client.commands.get(interaction.commandName);
        if(!command) throw "That command is not valid!";

        try {
            await command.execute(interaction, client);
        } catch (err) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setTitle(`An error has been encountered.`)
                    .setDescription(`Details of the error are shown below:\n\n\`\`\`${err}\`\`\``)
                    .setColor('Red')
                    .setFooter({ text: `An error has been encountered.` })
                ]
            });
        }
    }
}