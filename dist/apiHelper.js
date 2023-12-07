import axios from 'axios';
import fs from 'fs';
import { getFilesFromDirectory } from './fsHelper.js';
export async function postMultipleLeadsFromFiles(apiUrl, directoryPath, bearerToken) {
    const fileNames = getFilesFromDirectory(directoryPath);
    const customerUUIDs = [];
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
        }
        catch (error) {
            console.error(`Error in processing ${fileName}:`, error);
        }
    }
    return customerUUIDs;
}
