import { execSync } from "child_process"
import { getItemIDFromOnePasswordIfPresent } from "./getItemIDFromOnePasswordIfPresent"
import { getItemFromVaultCmd } from "./getItemFromVaultCmd"



export const restoreKeysFromOnePassword = async (
    email: string,
    vault: string,
) => {
    const id = getItemIDFromOnePasswordIfPresent(email, vault)
    const rawOutput = execSync(getItemFromVaultCmd(id??email, vault), { encoding: 'utf-8', stdio: 'pipe' })
    const parsedOutput = JSON.parse(rawOutput)

    const privateKey = parsedOutput.fields.find((field: any) => field.label === 'privateKey').value
    const certificate = parsedOutput.fields.find((field: any) => field.label === 'certificate').value

    return {
        privateKey: Buffer.from(privateKey, 'base64').toString('utf-8'),
        certificate: Buffer.from(certificate, 'base64').toString('utf-8')
    }
}
