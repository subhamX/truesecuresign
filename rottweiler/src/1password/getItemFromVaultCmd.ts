


export const getItemFromVaultCmd = (email: string, vault: string) => `op item get --vault=${vault} ${email} --format json`;
