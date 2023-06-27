import path from 'path';
import { runCommand } from '../utils/runCommand';



// Function to sign a PDF file using the private key and certificate
export async function signPDF(pdfFilePath:string) {
  try {
    // Get the path to the private key and certificate files
    const privateKeyPath = path.join(__dirname, '.truesecuresign', 'private_key.pem');
    const certificatePath = path.join(__dirname, '.truesecuresign', 'certificate.pem');

    // Generate the signed PDF file
    const signedPDFFilePath = path.join(__dirname, 'signed_document.pdf');
    await runCommand(
      `openssl smime -sign -in ${pdfFilePath} -out ${signedPDFFilePath} -signer ${certificatePath} -inkey ${privateKeyPath} -outform DER`
    );

    console.log('PDF file signed successfully.');
    console.log('Signed PDF file path:', signedPDFFilePath);
  } catch (error) {
    console.error('Error signing the PDF file:', error);
  }
}
