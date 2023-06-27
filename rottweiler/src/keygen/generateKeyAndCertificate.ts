import fs from 'fs';
import os from 'os';
import path from 'path';
import { runCommand } from '../utils/runCommand';
import { docuFolder } from '../utils/initCheck';
import { privateKeyPath, intermediaryCertificatePath, certificatePath } from '../utils/pathsConstants';
import chalk from 'chalk';


// Function to generate the private key and certificate
export async function generateKeyAndCertificate(email: string) {
  // Check if OpenSSL is available in the system path
  await runCommand('openssl version');

  // Variables for certificate information
  const COUNTRY = 'US';
  const STATE = 'California';
  const CITY = 'San Francisco';
  const ORGANIZATION = 'TrueSecureSign';
  const COMMON_NAME = 'truesecuresign.vercel.app';
  const EMAIL = email;




  // Generate private key without passphrase and store in the .truesecuresign folder
  await runCommand(
    `openssl genpkey -algorithm RSA -out ${path.join(docuFolder, 'private_key.pem')} -pkeyopt rsa_keygen_bits:2048`
  );

  // Generate certificate signing request (CSR) without passphrase
  await runCommand(
    `openssl req -new -key ${privateKeyPath} -out ${intermediaryCertificatePath} -subj "/C=${COUNTRY}/ST=${STATE}/L=${CITY}/O=${ORGANIZATION}/CN=${COMMON_NAME}/emailAddress=${EMAIL}"`
  );

  // Generate self-signed certificate from CSR without passphrase
  await runCommand(
    `openssl x509 -req -in ${intermediaryCertificatePath} -signkey ${path.join(docuFolder, 'private_key.pem')} -out ${certificatePath} -days 365`
  );

  // Clean up the intermediate CSR file
  await runCommand(`rm ${intermediaryCertificatePath}`);

  console.log(chalk.greenBright('Private key and certificate generated successfully.'));
}
