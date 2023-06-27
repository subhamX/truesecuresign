import path from 'path';
import { Command } from 'commander';
import { exec } from 'child_process';
import { initCLI } from './utils/initCheck';
import { printWelcome } from './utils/printWelcome';
import { readFile, stat } from 'fs';
import { handleInitCommand } from './commands/handleInitCommand';




const program = new Command();
export const vaultName = 'TrueSecureSixgnv4.12.0'
export const token = process.env.OP_SERVICE_ACCOUNT_TOKEN;


printWelcome()


program
    .name('TrueSecureSign')
    .description(`TrueSecureSign is a tool for securely signing your documents without sending you keys to our servers. It uses 1password for keys management.`)
    .version('0.0.1');

program.parse();


program.command('init')
    .description('Either load the keys from 1password backup or generate them and save a backup in it. Please make sure that the email is already registered in TrueSecureSign.')
    .action(handleInitCommand);



program.parse();


initCLI()



