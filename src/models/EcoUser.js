const { model, Schema } = require('mongoose');

module.exports = model('ecouser', new Schema({
    Guild: String,
    User: String,
    Wallet: Number,
    Vault: Number,
    LastWorkedMS: Number,
}))