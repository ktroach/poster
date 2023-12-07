#! /usr/bin/env node
import figlet from 'figlet';
import { Command } from "commander";
import { exit } from 'node:process';

import {
    listContents, 
    verifyPath, 
    getCurrentDirectory, 
    readFile, 
    writeFile, 
    purgeFile, 
    fileExists,
    isFileOpen 
} from "./fsHelper.js"; 

import { postMultipleLeadsFromFiles } from './apiHelper.js'; 
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
        const apiUrl = process.env.API_URL;
        const directoryPath = process.env.INPUT_PATH;
        const mongoUri  = process.env.MONGO_URI; 
        const dbName  = process.env.MONGO_DB;
        const outputPath = process.env.OUTPUT_PATH;
        const authToken = process.env.AUTH_TOKEN;
        //const customerUUIDs = await postMultipleLeadsFromFiles(apiUrl, directoryPath, authToken);
        const customerUUIDs = ["1888888","2888888","3888888"];
        // await getCustomerApplications(customerUUIDs, mongoUri, dbName, outputPath);
    }
}