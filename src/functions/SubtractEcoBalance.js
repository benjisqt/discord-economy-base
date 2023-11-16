const EcoUser = require('../models/EcoUser');

module.exports = async function SubtractEcoBalance(userid, guild, amount, walletOrVault) {
    const userexists = await guild.members.cache.get(userid);
    if(!userexists) throw "That user is not in this server.";

    const profile = await EcoUser.findOne({ Guild: guild.id, User: userexists.id });
    if(profile) {
        if(walletOrVault === 'vault') {
            if(profile.Vault - amount < 0) {
                throw `You cannot subtract more than this user has!`;
            }
            profile.Vault - amount;
            profile.save();
        } else {
            if(profile.Wallet - amount < 0) {
                throw `You cannot subtract more than this user has!`;
            }
            profile.Wallet - amount;
            profile.save();
        }
    } else throw "This user has no money!";
}