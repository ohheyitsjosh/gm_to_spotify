const fs = require('fs'); 
const neatCSV = require('neat-csv');

const gmDir = 'C:/Users/Josh/Desktop/GM/Takeout/Google Play Music/Playlists'
/**
 * Function browses through a directory of files
 * Produced by google music 
 * @param {string} gmDir - path to the google music folder  
 * @returns An object with keys that represenet each playlist folder. 
 * Values for those keys are an array of objects represening song and artist info 
 * As captured from the csv files
 */

// get all folders in the main directory 
const playlistFolders = fs.readdirSync(gmDir);    

// get all playlist folders
const getPlaylistFolders = (topLevelDir) => {
    return fs.readdirSync(topLevelDir);   
}

// get all files in a given folder
const getFolderFiles = (topLevelDir, folderDir) => {
    const folderPath = `${topLevelDir}/${folderDir}/Tracks`;
    return fs.readdirSync(folderPath);
}

function bufferToString (buffer) {
    const stringifiedBuffer = buffer.toString('ascii');
    return stringifiedBuffer;
}

function readFileToBuffer (topLevelDir, folderDir, filename) {
    const fileName = `${topLevelDir}/${folderDir}/Tracks/${filename}`;
    let fileData = fs.readFileSync(fileName, (err, data) => {
        if (err) {
            console.log(err); 
            return 
        } 
        return data;
    });
    return fileData;
}

async function loopFiles (topLevelDir, folderDir) {
    const fileList = getFolderFiles(topLevelDir, folderDir);
    const folderData = {};
    folderData[folderDir] = [];
    for (const file of fileList) {
        fileBuffer = readFileToBuffer(gmDir, folderDir, file);
        fileBuffer = await neatCSV(fileBuffer);
        folderData[folderDir].push(fileBuffer);
    }
    return folderData;
}


let musicData = []
const folderList = getPlaylistFolders(gmDir);

for (const folder of folderList) {
    const folderData = await loopFiles(gmDir, folder);
    musicData.push(folderData);
}

console.log(musicData);


