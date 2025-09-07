const chalk = require('chalk');
const getConfig = require('../config/config-mgr');

function start() {
    try {
        const config = getConfig();
        console.log(chalk.bgCyanBright('  Starting the app  '));
        console.log(chalk.gray('Received configuration in start -'), config);
        
        if (config.start) {
            config.start();
        } else {
            console.log(chalk.yellow('No start script found in config'));
        }
    } catch (error) {
        console.error(chalk.red('Error starting project:'), error.message);
    }
}

module.exports = { start };