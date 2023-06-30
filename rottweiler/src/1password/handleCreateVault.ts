import { execSync } from 'child_process';
import { vaultName } from '..';
import chalk from 'chalk';

export function handleCreateVault() {
    const createVault = `op vault create ${vaultName} --format json`;
    execSync(createVault, { encoding: 'utf-8', stdio: 'pipe' });
    console.log(chalk.greenBright('Vault created. ✅'));
}
