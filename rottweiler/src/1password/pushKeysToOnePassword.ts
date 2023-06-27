import { execSync } from "child_process"
import { getItemIDFromOnePasswordIfPresent } from "./getItemIDFromOnePasswordIfPresent"


export const pushKeysToOnePassword = async (
    email: string,
    vault: string,
    privateKey: string,
    certificate: string
) => {

    const encodedPrivateKey=Buffer.from(privateKey).toString('base64')
    const encodedCertificate=Buffer.from(certificate).toString('base64')

    const id=getItemIDFromOnePasswordIfPresent(email, vault)

    let cmd=`op item create --category='API Credential' --vault=${vault} Title=${email}  'privateKey=${encodedPrivateKey}' 'certificate=${encodedCertificate}'  --format json`

    if(id){
        cmd=`op item edit ${id} 'privateKey=${encodedPrivateKey}' 'certificate=${encodedCertificate}' --format json`
    }

    const rawOut=execSync(cmd, { encoding: 'utf-8', stdio: 'pipe' })
    const parsedOut=JSON.parse(rawOut)
    return parsedOut.uuid
}
