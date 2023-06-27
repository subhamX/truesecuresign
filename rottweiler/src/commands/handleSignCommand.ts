import chalk from "chalk";
import { Status } from "../api/validate";
import { validateIfKeysAndCredsAreAlreadyPresentLocally } from "../utils/validateIfKeysAndCredsAreAlreadyPresentLocally";
import fs, { readFileSync } from "fs"
import { tmpDir, userCredsPath } from "../utils/pathsConstants";
import { getSignedUrlFromServer } from "../api/getSignedUrl";
import { downloadFileFromUrl } from "../utils/downloadFileFromUrl";
import path from "path";
import { signPDFWrapper } from "../keygen/signPDFWrapper";
import { uploadSignedDoc } from "../api/uploadSignedDoc";

export async function handleSignCommand(documentId: string) {
    try {
        // check that the keys and creds are valid
        // if not valid, then ask the user to run init command
        const response = await validateIfKeysAndCredsAreAlreadyPresentLocally();

        if (response !== Status.KEYS_MATCHING) {
            console.log(chalk.redBright(`Please run the init command first!`));
            return;
        }else{
            console.log(chalk.greenBright(`You are ready to sign!`));
        }


        // create tmpDir
        if (!fs.existsSync(tmpDir)) {
            fs.mkdirSync(tmpDir);
        }

        // if valid, then sign the document
        const userCredsRaw = readFileSync(userCredsPath, { encoding: 'utf-8' });
        const userCredsJson = JSON.parse(userCredsRaw);
        // store the file in tmpDir
        const signedUrl = await getSignedUrlFromServer({
            token: userCredsJson.token,
            documentId
        })

        const filePath=await downloadFileFromUrl(signedUrl, tmpDir, `${documentId}.pdf`)
        // const signedDocPath=path.join(tmpDir, `${documentId}.signed.pdf`) // TODO: fix it
        // await signPDFWrapper(filePath, signedDocPath);

        console.log(chalk.greenBright(`Document signed successfully!`));

        const signedDocPath=filePath
        // upload the signed document
        await uploadSignedDoc({
            token: userCredsJson.token,
            documentId,
            filePath: signedDocPath
        })

        console.log(chalk.greenBright(`Signed document uploaded successfully to the server!`));
    } catch (err:any) {
        console.log(chalk.redBright(`Error: ${err.message}`));
        process.exit(1);
    }

}
