const EcoUser = require('../models/EcoUser');

module.exports = async function AddEcoBalance(userid, guild, amount, walletOrVault) {
    const userexists = await guild.members.cache.get(userid);
    if(!userexists) throw "That user is not in this server.";

    const profile = await EcoUser.findOne({ Guild: guild.id, User: userexists.id });
    if(profile) {
        if(walletOrVault === 'vault') {
            profile.Vault + amount;
            profile.save();
        } else {
            profile.Wallet + amount;
            profile.save();
        }
    } else {
        if(walletOrVault === 'vault') {
            await EcoUser.create({
                Guild: guild.id,
                User: userexists.id,
                Vault: amount,
                Wallet: 0,
                LastWorkedMS: 0,
            });
        } else {
            await EcoUser.create({
                Guild: guild.id,
                User: userexists.id,
                Vault: 0,
                Wallet: amount,
                LastWorkedMS: 0,
            });
        }
    }
}