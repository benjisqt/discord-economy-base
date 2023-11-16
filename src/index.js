const config = require('../config.json');
const Client = require('./functions/Client');
const botClient = new Client().start(config);