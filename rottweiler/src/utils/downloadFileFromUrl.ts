import chalk from 'chalk';
import fs from 'fs';
import http from 'http';
import https from 'https';
import path from 'path';

export const downloadFileFromUrl = async (url: string, tmpDir: string, fileName: string): Promise<string> => {
    // Determine whether to use 'http' or 'https' based on the URL
    const httpClient = url.startsWith('https') ? https : http;

    return await new Promise((resolve, reject) => {
        httpClient.get(url, (response: any) => {
            const contentType = response.headers['content-type'];
            const extension = contentType.split('/')[1];

            if(extension!=='pdf'){
                reject(new Error(`The file is not a PDF. It is a ${extension}`))
            }

            const filePath=path.join(tmpDir, fileName)
            const file = fs.createWriteStream(filePath);
            response.pipe(file);

            file.on('finish', () => {
                file.close();
                console.log(chalk.greenBright(`File downloaded successfully. 🙂`));
                resolve(filePath);
            });
        }).on('error', (err: string) => {
            reject(new Error(err))
        });
    })
};
