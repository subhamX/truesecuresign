import chalk from "chalk";

export async function getUserDetails() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    let user = {
        email: "",
        token: ""
    };

    user.email = await new Promise((resolve, reject) => {
        readline.question(chalk.blueBright('Please enter the registered email for truesecuresign?\n'), (email: string) => {
            // validate if the email is valid
            email = email.trim();

            if (!email) {
                return reject(new Error(`Email is required.`));
            }
            // validate if it's valid email
            const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
            if (!emailRegex.test(email)) {
                return reject(new Error(`Email is not valid.`));
            }
            resolve(email);
        });
    });


    user.token = await new Promise((resolve, reject) => {
        readline.question(chalk.blueBright('Please enter the CLI token visible at truesecuresign dashboard?\n'), (token: string) => {
            // validate if the email is valid
            token = token.trim();

            if (!token) {
                new Error(`Error: Email is required.`);
            }
            resolve(token);
        });
    });

    readline.close();
    return user;
}
