import { execSync } from 'child_process';
import { handleCreateVault } from './handleCreateVault';
import { vaultName } from '..';

export function ensureOnePasswordVaultExists() {
    const checkVaultCommand = `op vault get ${vaultName} --format json`;
    try {
        // check if vault is already created
        execSync(checkVaultCommand, { encoding: 'utf-8', stdio: 'pipe' });
    } catch (e: any) {
        if ((e?.stderr as string)?.indexOf(`"${vaultName}" isn't a vault in this account`) !== -1) {
            console.log('Vault not found. Creating vault...');
            try {
                handleCreateVault();
            } catch (e: any) {
                // console.log(`Error creating vault: ${e}`)
                throw e;
            }
        } else {
            // console.log(`Error checking vault: ${e}`)
            throw e;
        }
    }
}
