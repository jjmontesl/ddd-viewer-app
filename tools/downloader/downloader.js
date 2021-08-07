'use strict'
var http = require('https');
var fs = require('fs');
const { error } = require('console');
const { url } = require('inspector');


const urlsPrueba = ["https://3dsmaps.com/trips/acoruna-menhires.json", "https://3dsmaps.com/trips/salamanca-center.json", "https://3dsmaps.com/trips/newyork-manhattan.json"];
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
        var request = http.get(url, function (response) {
            response.pipe(file);
            file.on('finish', function () {
                res();  // close() is async, call cb after close completes.
            });
        }).on('error', function (err) { // Handle errors
            fs.unlink(dest); // Delete the file async. (But we don't check the result)
            reject(err);
        });
        
    })
}

// part of work
function errorMessage () {
    console.log("Usage:");
}

function divideUrl(url) {
    let urlSplit = url.split("https://3dsmaps.com/");
    let urlWithDirectoryFileOnly = urlSplit[1];
    
    let urlWithDirectoryOnly = urlWithDirectoryFileOnly.split("/");
    let nameFile = urlWithDirectoryOnly.pop();
    urlWithDirectoryOnly = urlWithDirectoryOnly.join("/");
    
    return [urlWithDirectoryOnly, nameFile];
}

function addUrl (minXY, maxXY) {
    let split = minXY.split(",");
    let minX = split[0];
    let minY = split[1];
    
    let split2 = maxXY.split(",");
    let maxX = split2 [0];
    let maxY = split2 [1];

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
            console.log(`The file has already been downloaded  ${urlWithDirectoryOnly + "/" + nameFile}`);
            continue;
        }
        
        createFolder(outputDir + "/" + urlWithDirectoryOnly);
        console.log(`Downloading... ${url} a ${urlWithDirectoryOnly}`);
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
    const outputDir = process.argv[2]; // 2 pq el 0 es node el 1 es la ruta y el 2 es lo que pones :)
    const minXY = process.argv[3];
    const maxXY = process.argv[4];
    if (process.argv.lenght > 4) {
        errorMessage();
    }
    addUrl(minXY, maxXY);
    workUrls(urls, outputDir);
}

main();

/*
- Acepta parametros en la linea de comandos que parametros:
    - Output Dir
    - Las cordenadas de un cacho
*/