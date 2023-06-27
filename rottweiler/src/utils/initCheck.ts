import { execSync } from 'child_process';
import { token } from '..';
import fs from 'fs'
import path from 'path';
import { homedir } from 'os';


export function onePasswordConfigCheck() {
    // get the 1password token from the environment
    if (!token) {
        throw new Error('Please set the OP_SERVICE_ACCOUNT_TOKEN environment variable to your 1password token with vault creation access. We don\'t want access to any of your personal vaults. 🤗');
    }

    // check if op is in path
    const opPath = execSync('which op', { encoding: 'utf-8' });
    if (!opPath) {
        throw new Error('Please install 1password CLI and make sure it is in your path. 🤗');
    }


    // check if the vault exists
    const userGet: any = execSync(`op user get --me --format json`, { encoding: 'utf-8' });
    const parsedUserGet = JSON.parse(userGet);

    if (!parsedUserGet || parsedUserGet.state !== 'ACTIVE') {
        throw new Error('Please make sure you have an active 1password account. 🤗');
    }
}

export const docuFolder = path.join(homedir(), '.truesecuresign');


export const initCLI = () => {
    // Create the .truesecuresign folder if it doesn't exist
    if (!fs.existsSync(docuFolder)) {
        fs.mkdirSync(docuFolder);
    }
}
