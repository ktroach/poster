#! /usr/bin/env node
import figlet from 'figlet';
import { Command } from "commander";
import { listContents, getCurrentDirectory } from "./fsHelper.js";
import { getCustomerApplications } from './dbHelper.js';
const CLI = new Command();
console.log(figlet.textSync("Poster"));
CLI.version("1.0.0")
    .description("Poster")
    .option("-l, --ls  [value]", "List Directory Contents")
    .option("-c, --cmd  [value]", "Run command name")
    .parse(process.argv);
const options = CLI.opts();
if (options.ls) {
    const filepath = typeof options.ls === "string" ? options.ls : getCurrentDirectory();
    listContents(filepath);
}
if (options.cmd) {
    console.log("Running Command: ", options.cmd);
    if (options.cmd === 'post-multiple-leads') {
        const apiUrl = 'http:localhost:3000/api/lead';
        const directoryPath = './data';
        const mongoUri = 'mongodb+srv://GHMongoDev:uGlMRSRm65pWU7jb@ghloan-dev.7iaataf.mongodb.net';
        const dbName = 'test';
        const outputPath = './output';
        const authToken = "";
        console.log("This would call postMultipleLeadsFromFiles");
        //const customerUUIDs = await postMultipleLeadsFromFiles(apiUrl, directoryPath, authToken);
        const customerUUIDs = ["1888888", "2888888", "3888888"];
        await getCustomerApplications(customerUUIDs, mongoUri, dbName, outputPath);
    }
}
