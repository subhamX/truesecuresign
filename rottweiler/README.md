# TrueSecureSign CLI

The TrueSecureSign CLI is a powerful command-line tool designed to provide a secure and efficient way to initialize your private keys and sign PDF documents. With TrueSecureSign CLI, you can maintain complete control over your keys and ensure the utmost privacy and security.

## Pre Requisites

1. To use TrueSecureSign CLI, ensure you have [Node.js](https://nodejs.org) and NPM installed on your system.
2. Ensure that 1password CLI is already installed and in PATH. You can follow the instructions at [this link](https://developer.1password.com/docs/cli/get-started/#install) to perform this installation. You can verify it by executing:
```bash
op --version
```
3. Create a new [Service Account](https://developer.1password.com/docs/service-accounts) and set `OP_SERVICE_ACCOUNT_TOKEN` env variable with service account token. Please don't provide access to any of your existing vaults, but allow the service account to create vaults.
```bash
export OP_SERVICE_ACCOUNT_TOKEN={token}
```

## Usage

### Initialize Private Keys

Before using TrueSecureSign CLI, make sure you have your email and token ready. You can find the token at [https://truesecuresign.vercel.app/register-cli](https://truesecuresign.vercel.app/register-cli) after logging in.

To initialize your private keys and generate a certificate, use the `init` command:

```shell
npx truesecuresign init
```

During the initialization process, your private keys and certificate will be securely generated and stored locally on your device. Rest assured that TrueSecureSign CLI does not transmit any keys or data to our servers, maintaining the highest level of security. For backup we do push them to 1password to which we don't have any access. You can opt out of it too.

### Sign a Document

To digitally sign a PDF document using your private key, use the `sign` command:

```shell
npx truesecuresign sign docId
```

Replace `docId` with the ID or path of the document you want to sign. TrueSecureSign CLI will utilize your locally stored private key to apply a legally binding electronic signature to the document. This ensures that only you have the ability to sign documents, as your keys are never accessible to anyone else, including TrueSecureSign.

## Security

TrueSecureSign CLI prioritizes your security and privacy. Your private keys and certificate remain securely stored on your local machine, and TrueSecureSign does not have access to your keys or the ability to sign documents on your behalf. We back up your keys using the 1Password integration, which securely transfers the backup file from your device to your 1Password vault, providing an additional layer of protection. Do note that we can never access them.

