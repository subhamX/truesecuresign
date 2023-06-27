import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';

export function printWelcome() {
    clear();
    console.log(
        chalk.yellow(
            figlet.textSync('TrueSecureSign', { horizontalLayout: 'full' })
        )
    );
}
