const chalk = require('chalk');
const logger = require('../logger')('commands:start');
const getConfig = require('../config/config-mgr');

function start() {
    try {
        const config = getConfig();
        logger.highlight('  Starting the app  ');
        logger.debug('received configuration', config);
        logger.debug('config.start exists?', !!config.start);
        logger.debug('type of config.start:', typeof config.start);
        
        if (config.start && typeof config.start === 'function') {
            logger.debug('executing config.start()');
            config.start();
        } else {
            console.log(chalk.yellow('No start script found in config'));
            console.log(chalk.gray('Available keys:'), Object.keys(config));
        }
    } catch (error) {
        console.error(chalk.red('Error starting project:'), error.message);
    }
}

module.exports = { start };