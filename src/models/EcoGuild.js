const { model, Schema } = require('mongoose');

module.exports = model('ecoguild', new Schema({
    Guild: String,
    ShopItems: Array,
}))