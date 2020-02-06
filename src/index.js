#!/usr/bin/env node

const path = require('path');
const process = require('process');
const program = require('commander');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });
require('dotenv').config({ path: path.resolve(process.cwd(), 'config/.env') });

const clean = require('./lib/actions/clean');
const sync = require('./lib/actions/sync');
const inject = require('./lib/actions/inject');
const version = require('./lib/version');


program
  .version(version.show());

program
  .command('sync')
  .description('Synchronizes the infrastructure.')
  .option('-c, --config [path]', 'Path to config file.', './config/main.json')
  .action(sync.do);

program
  .command('clean')
  .description('Removes all the resources.')
  .option('-c, --config [path]', 'Path to config file.', './config/main.json')
  .action(clean.do);

program
  .command('inject')
  .description('Injects keys into chainspec (non-raw).')
  .option('-f, --file [path]', 'Path to chainspec file.', "./chainspec")
  .option('-S, --sr25519 [path]', 'Path to sr25519 key', "./sr25519_key")
  .option('-E, --ed25519 [path]', 'Path to ed25519 key', "./ed25519_key")
  .action(inject.do);

program.allowUnknownOption(false);

const parsed = program.parse(process.argv);
if (!parsed || !(parsed.args && parsed.args.length > 0 && (typeof (parsed.args[0] === 'object')))) {
  program.outputHelp();
}
