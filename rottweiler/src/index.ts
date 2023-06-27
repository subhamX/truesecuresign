import { Command } from 'commander';
import { initCLI } from './utils/initCheck';
import { printWelcome } from './utils/printWelcome';
import { handleInitCommand } from './commands/handleInitCommand';
import { handleSignCommand } from './commands/handleSignCommand';




const program = new Command();
export const vaultName = 'TrueSecureSixgnv4.12.0'
export const token = process.env.OP_SERVICE_ACCOUNT_TOKEN;

initCLI()
printWelcome()


program
    .name('TrueSecureSign')
    .description(`TrueSecureSign is a tool for securely signing your documents without sending you keys to our servers. It uses 1password for keys management.`)
    .version('0.0.1');

program.parse();


program.command('init')
    .description('Either load the keys from 1password backup or generate them and save a backup in it. Please make sure that the email is already registered in TrueSecureSign.')
    .action(handleInitCommand);



program.command('sign')
    .description('Sign a document securely with the keys present in local machine.')
    .argument('<documentId>', 'Id of the document to be signed.')
    .action(handleSignCommand);


program.parse();





