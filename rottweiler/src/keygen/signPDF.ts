import * as fs from 'fs';
import { execSync } from 'child_process';
import { PDFDocument, rgb, degrees } from 'pdf-lib';
import * as signPdf from 'node-signpdf';
import { certificatePath, p12CertificatePath, privateKeyPath } from '../utils/pathsConstants';
const { plainAddPlaceholder, pdfkitAddPlaceholder } = require('node-signpdf/dist/helpers/index.js');
import { pdfSigner } from "../../spdfjs-src/dist";
const forge = require('node-forge');
import rs, { KEYUTIL, KJUR, RSAKey } from "jsrsasign";




export async function signAndAddTextToPDF(inputPDF: string, outputFile: string, email: string, id:string, documentId: string) {
    const pdfBuffer = fs.readFileSync(inputPDF);
    const signer = new pdfSigner();


    const outputPDFBuffer = await signer.newSing(
        pdfBuffer,
        {
            signer: {
                key: fs.readFileSync(privateKeyPath),
                cert: fs.readFileSync(certificatePath),
            },
        },
        {
            signer: {
                Name: email,
                ContactInfo: `${id} ${documentId}`,
            },
            signature: {
                page: 1,
                rect: {
                    x: 10,
                    y: -95,
                    h: 150,
                    w: 110,
                },
                text: {
                    txt: `Signed by: ${email} at ${new Date().toUTCString()}`,
                    color: rgb(0.8, 0.2, 0.2),
                }
            },
        }
    )
    fs.writeFileSync(outputFile, outputPDFBuffer);
}
