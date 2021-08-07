/* eslint-disable no-var */

'use strict'

/**
 * Retrieves assets and tiles from a remote DDD 3D tiles server.
 * See readme.md file for more information.
 */

var http = require('https');
var fs = require('fs');
var readlineSync = require('readline-sync');
//const { error } = require('console');
//const { url } = require('inspector');


const MAX_SAFE_URLS = 64

const urls = [
    "https://3dsmaps.com/assets/catalog_materials-default256.glb",
    "https://3dsmaps.com/assets/catalog.glb",
    /*
    "https://3dsmaps.com/cache/ddd_http/17/62476/47969.glb",
    "https://3dsmaps.com/cache/ddd_http/17/62476/47968.glb",
    "https://3dsmaps.com/cache/ddd_http/17/62475/47968.glb",
    "https://3dsmaps.com/cache/ddd_http/17/62474/47969.glb",
    "https://3dsmaps.com/cache/ddd_http/17/62474/47968.glb",
    "https://3dsmaps.com/cache/ddd_http/17/62475/47969.glb"
    */
]

const urlPrefix = "https://3dsmaps.com/";
const urlBase = "https://3dsmaps.com/cache/ddd_http/17/";


var download =  function (url, dest) {
    var file = fs.createWriteStream(dest);

    return new Promise ((res, reject) => {
        const request = http.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                res();  // close() is async, call cb after close completes.
            });
        }).on('error', (err) => { // Handle errors
            fs.unlink(dest); // Delete the file async. (But we don't check the result)
            reject(err);
        });
    });
}

function errorMessage () {
    process.stdout.write("Usage:\n\n");
    process.stdout.write("  node downloader.js <output_dir> <min_x,min_y> [max_x,max_y]\n\n");
    process.stdout.write("Parameters:\n");
    process.stdout.write("  output_dir    Base output directory for downloaded files\n");
    process.stdout.write("  min_x,min_y   Tile coordinates to download\n");
    process.stdout.write("  max_x,max_y   Optional opposite corner of the bounding box of tiles to be downloaded\n");
    process.stdout.write("\n");
    process.exit(1);
}

function divideUrl(url) {
    let urlSplit = url.split("https://3dsmaps.com/");
    let urlWithDirectoryFileOnly = urlSplit[1];
    
    let urlWithDirectoryOnly = urlWithDirectoryFileOnly.split("/");
    let nameFile = urlWithDirectoryOnly.pop();
    urlWithDirectoryOnly = urlWithDirectoryOnly.join("/");
    
    return [urlWithDirectoryOnly, nameFile];
}

function addUrls(minXY, maxXY) {
    let split = minXY.split(",");
    let minX = parseInt(split[0]);
    let minY = parseInt(split[1]);

    let split2 = maxXY.split(",");
    let maxX = parseInt(split2[0]);
    let maxY = parseInt(split2[1]);

    for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
            let urlWork = urlBase + x + "/" + y + ".glb";
            urls.push(urlWork);
        }
    }
}

async function workUrls(urls, outputDir) {
    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        let [urlWithDirectoryOnly, nameFile] = divideUrl(url);
        
        if (checkifIsDownloaded(outputDir + "/" + urlWithDirectoryOnly + "/" + nameFile)) {
            console.log(`File has already been downloaded: ${urlWithDirectoryOnly + "/" + nameFile}`);
            continue;
        }
        
        createFolder(outputDir + "/" + urlWithDirectoryOnly);
        console.log(`Downloading... ${url} to ${outputDir}/${urlWithDirectoryOnly}`);
        await download(url, outputDir + "/" + urlWithDirectoryOnly + "/" + nameFile);
    }
}

function checkifIsDownloaded(nameFile) {
    return fs.existsSync(nameFile);
}

function createFolder(urlWithDirectoryOnly) {
    fs.mkdirSync(urlWithDirectoryOnly, { recursive: true });
}

function main() {

    // Check input arguments
    if (process.argv.length < 4 || process.argv.length > 5) {
        errorMessage();
    }

    const outputDir = process.argv[2];
    const minXY = process.argv[3];
    const maxXY = process.argv.length > 4 ? process.argv[4] : process.argv[3];  // Accept maxXY argument as optional

    addUrls(minXY, maxXY);

    // Sanity check for the number of tiles to be downloaded
    if (urls.length > MAX_SAFE_URLS) {
        process.stdout.write(`Warning! You are trying to download many files (${ urls.length } tiles).\n`);
        const answer = readlineSync.question("Do you wish to continue? Type 'yes' to confirm: ");
        if (answer !== "yes") {
            process.exit(2);
        }
    }

    workUrls(urls, outputDir);
}

main();

