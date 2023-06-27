import { onePasswordConfigCheck } from '../utils/initCheck';
import { generateKeyAndCertificate } from '../keygen/generateKeyAndCertificate';
import chalk from 'chalk';
import { readFileSync, writeFileSync } from 'fs';
import { getUserDetails } from '../utils/getUserDetails';
import { certificatePath, privateKeyPath, userCredsPath } from '../utils/pathsConstants';
import { getPublicKeyFromCertificate } from '../keygen/getPublicKeyFromCertificate';
import { Status, validateCredsFromServer } from '../api/validate';
import { restoreKeysFromOnePassword } from '../1password/restoreKeysFromOnePassword';
import { pushKeysToOnePassword } from '../1password/pushKeysToOnePassword';
import { registerCredsAndPublicKeyToServer } from '../api/registerCredsAndPublicKeyToServer';
import { ensureOnePasswordVaultExists } from '../1password/ensureOnePasswordVaultExists';
import { validateIfKeysAndCredsAreAlreadyPresentLocally } from '../utils/validateIfKeysAndCredsAreAlreadyPresentLocally';
import { vaultName } from '..';

export async function handleInitCommand(options: any) {

    const importKeysFromOnePassword = async (user: { email: string; token: string; }) => {
        try {
            console.log(chalk.yellowBright(`Checking if the keys are present in 1password vault..`));
            // check if the keys are already present in vault
            const keys = await restoreKeysFromOnePassword(user.email, vaultName);
            // if we're here it means we can load the keys
            console.log(chalk.greenBright(`The keys are present in 1password vault. Loading them..`));
            // load the keys
            // store the and certificate
            writeFileSync(certificatePath, keys.certificate);
            writeFileSync(privateKeyPath, keys.privateKey);
            return true;
        } catch (err: any) {
            if (err.message.indexOf(`"${user.email}" isn't an item in the "${vaultName}" vault`) === -1) {
                throw err;
            }
            return false;
        }
    };


    const exportKeysToOnePassword = async (user: { email: string; token: string; }) => {
        console.log(chalk.yellowBright(`Saving the keys in 1password vault..`));
        // save keys in 1password
        const certificate = readFileSync(certificatePath, { encoding: 'utf-8' });
        const privateKey = readFileSync(privateKeyPath, { encoding: 'utf-8' });
        await pushKeysToOnePassword(user.email, vaultName, privateKey, certificate);
        console.log(chalk.greenBright(`Backup to 1password vault successful!`));
    };

    try {
        onePasswordConfigCheck();

        const response = await validateIfKeysAndCredsAreAlreadyPresentLocally();

        if (response) {
            if (response === Status.KEYS_MATCHING) {
                console.log(chalk.greenBright(`You are ready to login! Everything good, the keys are matching too!`));
                return;
            }
        }
        // here either response==null or response===Status.CREDS_OK_NO_PUBLIC_KEY_GIVEN or Status.KEYS_NOT_MATCHING
        // ask the email and token
        let user: {
            email: string;
            token: string;
        };

        let isUserCredsPresent = (response === null) ? false : true;
        let areKeysPresentLocally = (response === Status.KEYS_NOT_MATCHING);

        // ensure keys are present
        if (response === Status.KEYS_NOT_MATCHING) {
            // just register the keys
            console.log(chalk.yellowBright(`The keys are present locally but not matching on server. Registering the keys..`));
        }

        if (!isUserCredsPresent) {
            user = await getUserDetails();
        } else {
            user = JSON.parse(readFileSync(userCredsPath).toString());
        }

        if (response === null) {
            // it means we got the input from the user. and need to validate it
            console.log(chalk.yellow(`Validating the email and token..`));
            // validate the email and token
            await validateCredsFromServer({
                email: user.email,
                token: user.token
            });

            // if there is no error, it means the creds are valid
        }




        // creds are present
        isUserCredsPresent = true;

        // store the email and token in env
        writeFileSync(userCredsPath, JSON.stringify(user, null, 2));



        ensureOnePasswordVaultExists();

        let areKeysPresentInOnePassword = false;



        if (!areKeysPresentLocally) {
            const importResponse = await importKeysFromOnePassword(user);
            if (importResponse) areKeysPresentLocally = true, areKeysPresentInOnePassword = true;
            else {
                console.log(chalk.redBright(`The keys are not present in 1password vault. `));

                console.log(chalk.yellowBright(`Generating new keys..`));
                // generate keys
                await generateKeyAndCertificate("idevsubham@gmail.com");
                console.log(chalk.greenBright(`Keys generated successfully..`));
            }
        }

        areKeysPresentLocally = true;

        if (!areKeysPresentInOnePassword) {
            await exportKeysToOnePassword(user);
        }


        // we will register it below. since there are changes in which the keys are
        // present locally but not registered in server. so we will register it below
        // validate the keys to ensure that everything is good!
        console.log(chalk.redBright(`Re checking the status from server..`));
        let status = await validateIfKeysAndCredsAreAlreadyPresentLocally();

        if (status === Status.KEYS_NOT_MATCHING) {
            const publicKey = getPublicKeyFromCertificate(certificatePath);
            console.log(chalk.greenBright(`Registering the publicKey on server..`));
            // register the keys with server
            const status = await registerCredsAndPublicKeyToServer({
                email: user.email,
                token: user.token,
                publicKey: publicKey
            });
            console.log(chalk.greenBright(`The publicKey is saved on 1password vault.`));
            return;
        }

        console.log(chalk.greenBright(`You are ready to login!`));
    } catch (e: any) {
        console.log(chalk.redBright(`Error: ${e.message}`));
        process.exit(1);
    }
}
