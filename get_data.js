const fs = require('fs'); 
const parse = require('csv-parse/lib/sync')
const config = require('./config')

// file directory that contains the google music info 
const gmFolder = config.gmFolder;

const findAllFiles = () => {
    let collectedData = [];
    const folderList = fs.readdirSync(gmFolder);
    for (const folder of folderList) {
        const tracksFolderPath = `${gmFolder}/${folder}/Tracks`;
        const folderData = {playlistName: folder, tracksFolder: tracksFolderPath, files: []};
        const tracksFolderFileList = fs.readdirSync(tracksFolderPath); 
        for (const file of tracksFolderFileList) {
            const fileName = `${gmFolder}/${folder}/Tracks/${file}`;
            folderData.files.push(fileName);
        }
        collectedData.push(folderData);
    }
    return collectedData;
}

const readFileData = () => {

    const fileData = findAllFiles();
    for (const folderObject of fileData) {
        folderObject.trackData = [];
        const filesToRead = folderObject.files;
        for (const file of filesToRead) {
            const data = fs.readFileSync(file, 'utf-8');
            const parsedData = parse(data, {columns: true, skip_empty_lines: true});
            folderObject.trackData.push(parsedData[0]);
        }
    }
    return fileData;
}

readFileData();