import { execSync } from 'child_process';
import { handleCreateVault } from './handleCreateVault';
import { vaultName } from '..';
import chalk from 'chalk';

export function ensureOnePasswordVaultExists() {
    const checkVaultCommand = `op vault get ${vaultName} --format json`;
    try {
        // check if vault is already created
        execSync(checkVaultCommand, { encoding: 'utf-8', stdio: 'pipe' });
    } catch (e: any) {
        if ((e?.stderr as string)?.indexOf(`"${vaultName}" isn't a vault in this account`) !== -1) {
            console.log(chalk.yellowBright(`Vault ${vaultName} not found. Creating one... 🤗`));
            try {
                handleCreateVault();
            } catch (e: any) {
                throw e;
            }
        } else {
            throw e;
        }
    }
}
