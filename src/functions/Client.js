const Discord = require('discord.js');
const fs = require('fs');
const mongoose = require('mongoose');
const Log = require('./Logger');

module.exports = class DiscordClient {
    async start(config) {
        const client = new Discord.Client({
            intents: [
                'Guilds',
                'GuildMembers',
                'MessageContent',
                'GuildMessages',
                'GuildEmojisAndStickers',
            ]
        });

        client.commands = new Discord.Collection();
        
        client.login(config.Token).then(async() => {
            this.loadHandlers(client, config);
        });
    }
    
    async loadHandlers(client, config) {
        if(config.MongoEnabled === false) {
            this.loadCommands(client);
            this.loadEvents(client);
        } else {
            this.loadCommands(client);
            this.loadEvents(client);
            this.loadMongo(config);
        }
    }

    async loadCommands(client) {
        let commandsArray = [];
        const commandsFolder = fs.readdirSync(`./src/cmd`);

        for (const folder of commandsFolder) {
            const files = fs.readdirSync(`./src/cmd/${folder}`).filter((file) => file.endsWith(".js"));

            for (const file of files) {
                const cmd = require(`../cmd/${folder}/${file}`);

                client.commands.set(cmd.data.name, cmd);

                commandsArray.push(cmd.data.toJSON());

                continue;
            }
        }

        client.application.commands.set(commandsArray);

        return Log(`Commands Loaded.`, false);
    }

    async loadEvents(client) {
        const folders = fs.readdirSync(`./src/events`);

        for (const folder of folders) {
            const eventFiles = fs.readdirSync(`./src/events/${folder}`).filter((file) => file.endsWith(".js"));

            for (const file of eventFiles) {
                const event = require(`../events/${folder}/${file}`);

                if(event.rest) {
                    if(event.once) client.rest.once(event.name, (...args) => event.execute(...args, client));
                    else client.rest.on(event.name, (...args) => event.execute(...args, client));
                } else {
                    if(event.once) client.once(event.name, (...args) => event.execute(...args, client));
                    else client.on(event.name, (...args) => event.execute(...args, client));
                }

                continue;
            }
        }

        return Log(`Events Loaded.`, false);
    }

    async loadMongo(config) {
        if(config.MongoEnabled === false) return;
        else {
            const connection = await mongoose.connect(config.MongoURI);
            if(connection) {
                return Log(`Successfully connected to MongoDB Database.`, false);
            } else {
                return Log(`There was an error connecting to MongoDB Database.`, true);
            }
        }
    }
}