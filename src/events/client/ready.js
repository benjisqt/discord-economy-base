const { Client } = require('discord.js');
const Log = require('../../functions/Logger');

module.exports = {
    name: 'ready',

    /**
     * 
     * @param {Client} client
     */

    async execute(client) {
        return Log(`${client.user.tag} has logged in!`);
    }
}