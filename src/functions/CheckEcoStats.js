const EcoUser = require('../models/EcoUser');

module.exports = async function CheckEcoStats(guildid, userid) {
    const userexists = await guild.members.cache.get(userid);
    if(!userexists) throw "That user is not in this server.";

    const profile = await EcoUser.findOne({ Guild: guild.id, User: userexists.id });
    if(profile) {
        const EcoStats = {
            VaultBalance: profile.Vault,
            WalletBalance: profile.Wallet,
        }

        return EcoStats;
    } else throw "This user does not have an economy profile!";
}