import { execSync } from "child_process";
import { getItemFromVaultCmd } from "./getItemFromVaultCmd";


export const getItemIDFromOnePasswordIfPresent = (
    email: string,
    vault: string
): string | null => {
    try {
        const rawOutput = execSync(getItemFromVaultCmd(email, vault), { encoding: 'utf-8', stdio: 'pipe' });
        return null;
    } catch (e: any) {

        const regex = `for the item "${email}" in vault ${vault}: (\\w+)`;

        const matches = e.message.match(regex);

        if (matches && matches.length > 1) {
            const firstID = matches[1];
            return firstID;
        } else {
            return null;
        }
    }
};
