#!/usr/bin/env node
const arg = require('arg');
const chalk = require('chalk');
const { getConfig } = require('../src/config/config-mgr');
const { start } = require('../src/commands/start');

try {
  const args = arg({
    '--start': Boolean,
    '--build': Boolean,
  });

  if (args['--start']) {
    console.log(chalk.blue('Found configuration'), getConfig());
    start();
  }
} catch (e) {
  console.log(chalk.yellow(e.message));
  console.log();
  usage();
}

function usage() {
  console.log(`${chalk.whiteBright('tool [CMD]')}
  ${chalk.greenBright('--start')}\tStarts the app
  ${chalk.greenBright('--build')}\tBuilds the app`);
}