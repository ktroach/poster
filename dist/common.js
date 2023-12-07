import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { openSync, closeSync, appendFileSync, writeFileSync, existsSync, mkdirSync, statSync, readdirSync, unlinkSync, accessSync } from "node:fs";
import { error } from "console";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export function getCurrentDirectory() {
    return __dirname;
}
/** Join a new path to the current directory path */
export function joinPath(newPath) {
    return path.join(__dirname, newPath);
}
/**
 * Join all arguments together and normalize the resulting path.
 * @param sourcePath — path to join to.
 * @param newPath — new path join to join.
 */
export function joinPaths(sourcePath, newPath) {
    return path.join(sourcePath, newPath);
}
/**
 * @param filepath Normalize a string path, reducing '..' and '.' parts.
 * When multiple slashes are found, they're replaced by a single one; when the path contains a trailing slash, it is preserved.
 * On Windows backslashes are used.
 * @returns string normalized path
 **/
export function normalizePath(filepath) {
    return path.normalize(filepath);
}
/**
 * The right-most parameter is considered {to}. Other parameters are considered an array of {from}.
 * Starting from leftmost {from} parameter, resolves {to} to an absolute path.
 * If {to} isn't already absolute, {from} arguments are prepended in right to left order, until an absolute path is found.
 * If after using all {from} paths still no absolute path is found, the current working directory is used as well.
 * The resulting path is normalized, and trailing slashes are removed unless the path gets resolved to the root directory.
 * @param paths — A sequence of paths or path segments.
 **/
export function resolvePath(from, to) {
    return path.resolve(from, to);
}
export function verifyPath(directoryPath) {
    const normalizedPath = normalizePath(directoryPath);
    if (existsSync(normalizedPath)) {
        const stats = statSync(normalizedPath);
        if (stats.isDirectory()) {
            return true;
        }
        else {
            console.error(`${normalizedPath} is not a directory.`);
            return false;
        }
    }
    else {
        console.error(`${normalizedPath} does not exist.`);
        return false;
    }
}
export function listContents(directoryPath) {
    if (verifyPath(directoryPath)) {
        const normalizedPath = normalizePath(directoryPath);
        const contents = readdirSync(normalizedPath);
        console.log(`Contents of ${normalizedPath}:`, contents);
        return contents;
    }
}
export function createDir(filepath) {
    if (!existsSync(filepath)) {
        mkdirSync(filepath);
        console.log("The directory has been created successfully");
    }
}
export function fileExists(filePath) {
    return existsSync(filePath);
}
export function readFile(filePath) {
    return fs.readFileSync(filePath, { encoding: "utf8", flag: "r" });
}
export function writeFile(filePath, data, isJson) {
    let fd = -1;
    try {
        if (fileExists(filePath)) {
            throw error('File exists');
        }
        fd = openSync(filePath, "wx");
        if (isJson) {
            writeFileSync(fd, JSON.stringify(data, null, 4));
        }
        else {
            writeFileSync(fd, data);
        }
    }
    catch (err) {
        console.log(err);
    }
    finally {
        if (fd !== undefined && fd > 0) {
            console.log(">>> fd >>> ", fd);
            closeSync(fd);
        }
    }
}
export function appendFile(filePath, data) {
    let fd = -1;
    try {
        fd = openSync(filePath, "w");
        appendFileSync(fd, data, 'utf8');
    }
    catch (err) {
        console.log(err);
    }
    finally {
        if (fd !== undefined)
            closeSync(fd);
    }
}
export function purgeFile(filePath) {
    try {
        if (!fileExists(filePath)) {
            throw error('warning - nothing to purge, file does not exist');
        }
        unlinkSync(filePath);
        console.log("Purged file: ", filePath);
    }
    catch (err) {
        console.log(err);
    }
    finally {
    }
}
export function isFileOpen(filePath) {
    let isOpen = false;
    try {
        accessSync(filePath, fs.constants.R_OK);
        console.log('File is accessible.');
    }
    catch (err) {
        isOpen = true;
        if (err.code === 'EACCES') {
            console.log('File is already open.');
        }
        else {
            throw err;
        }
    }
    return isOpen;
}
