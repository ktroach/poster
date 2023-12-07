import { MongoClient } from 'mongodb';
import { writeFileData } from './fsHelper.js';
export async function getCustomerApplications(uuids, mongoUri, dbName, outputPath) {
    const client = new MongoClient(mongoUri, {});
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('applications');
    for (const uuid of uuids) {
        try {
            const queryResult = await collection.findOne({ customer_uuid: uuid });
            if (queryResult) {
                const filePath = `${outputPath}/applications/result_${uuid}.json`;
                const fileData = JSON.stringify(queryResult, null, 2);
                writeFileData(filePath, fileData);
            }
        }
        catch (error) {
            console.error(`Error querying MongoDB for UUID ${uuid}:`, error);
        }
    }
    await client.close();
}
export async function getPostApiLogRequests(uuids, mongoUri, dbName, outputPath) {
    const client = new MongoClient(mongoUri, {});
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('posting_api_logs');
    for (const uuid of uuids) {
        try {
            const queryResult = await collection.findOne({ "request_data.customer_uuid": uuid });
            const filePath = `${outputPath}/post_api_logs/result_${uuid}.json`;
            const fileData = JSON.stringify(queryResult, null, 2);
            writeFileData(filePath, fileData);
        }
        catch (error) {
            console.error(`Error querying MongoDB for UUID ${uuid}:`, error);
        }
    }
    await client.close();
}
