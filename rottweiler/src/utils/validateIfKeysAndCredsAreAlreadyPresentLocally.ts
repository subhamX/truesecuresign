import chalk from 'chalk';
import { readFileSync } from 'fs';
import { certificatePath, userCredsPath } from './pathsConstants';
import { getPublicKeyFromCertificate } from '../keygen/getPublicKeyFromCertificate';
import { validateCredsFromServer } from '../api/validate';

export async function validateIfKeysAndCredsAreAlreadyPresentLocally() {
    let userCredsJson: {
        email: string;
        token: string;
    } | null = null;
    let publicKey: any = undefined;


    try {
        // load the creds if present
        const userCredsRaw = readFileSync(userCredsPath, { encoding: 'utf-8' });
        userCredsJson = JSON.parse(userCredsRaw);
        console.log(chalk.yellowBright(`The email and token are present locally... 🤫`));
        try {
            publicKey = getPublicKeyFromCertificate(certificatePath);
            console.log(chalk.yellowBright(`Got the public key from certificate... 😊`));
        } catch (err: any) {
            // if file doesn't exist then don't throw any error
            if (err.code !== 'ENOENT') {
                throw err;
            }
            console.log(chalk.redBright(`keys are not present locally... 😭`));
        }
    } catch (err: any) {
        // if file doesn't exist then don't throw any error
        if (err.code !== 'ENOENT') {
            throw err;
        }
        console.log(chalk.redBright(`Creds are not present locally... 😭`));
        return null;
    }


    return await validateCredsFromServer({
        email: userCredsJson?.email as any,
        token: userCredsJson?.token as any,
        publicKey
    });
}
