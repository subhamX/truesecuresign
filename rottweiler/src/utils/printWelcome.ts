import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';

export function printWelcome() {
    clear();
    console.log(
        chalk.yellowBright(
            figlet.textSync('TrueSecureSign', { horizontalLayout: 'full' })
        )
    );
}
