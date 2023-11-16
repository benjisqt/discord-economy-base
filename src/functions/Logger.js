const chalk = require('chalk');

module.exports = async function Log(message, error) {
    if(error === true) {
        return console.log(`${chalk.bold(chalk.red(`Economy Bot`))} ${chalk.bold(`>>`)} ${chalk.italic(message)}`);
    } else {
        return console.log(`${chalk.bold(chalk.magenta(`Economy Bot`))} ${chalk.bold(`>>`)} ${chalk.italic(message)}`);
    }
}