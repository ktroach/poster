import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { getFilesFromDirectory } from './fsHelper.js'

export async function postMultipleLeadsFromFiles(apiUrl: string, directoryPath: string, bearerToken: string): Promise<string[]> {
    const fileNames = getFilesFromDirectory(directoryPath);
    const customerUUIDs: string[] = [];

    const axiosConfig = {
        headers: {
            Authorization: `Bearer: ${bearerToken}`
        }
    };

    for (const fileName of fileNames) {
        try {
            const fileContent = fs.readFileSync(fileName, 'utf8');
            const body = JSON.parse(fileContent);

            await axios.post(apiUrl, body, axiosConfig); 
            if (body.customer_uuid) {
                customerUUIDs.push(body.customer_uuid);
            }
        } catch (error) {
            console.error(`Error in processing ${fileName}:`, error);
        }
    }

    return customerUUIDs;
}
