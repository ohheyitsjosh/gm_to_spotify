const fs = require('fs'); 
const parse = require('csv-parse/lib/sync')
const config = require('./config')

// file directory that contains the google music info 
const gmFolder = config.gmFolder;

/**
 * Finds all files from all individual playlist folders 
 * Pushes each track file located in each playlist folder into an object 
 * @returns an array containing an object for each playlist folder which details each track file in the folder 
 */
const findAllFiles = () => {
    // this array will collect every playlist folder object 
    let collectedData = [];
    // find all playlist folders 
    const folderList = fs.readdirSync(gmFolder);
    for (const folder of folderList) {
        // build the full path to the folder 
        const tracksFolderPath = `${gmFolder}/${folder}/Tracks`;
        // create the folder object and assign the values
        const folderData = {
            playlistName: folder, 
            tracksFolder: tracksFolderPath, 
            files: []
        };
        // read files of the current playlist folder 
        const tracksFolderFileList = fs.readdirSync(tracksFolderPath); 
        // find all individual track files and push them into the 'files' property of the object 
        for (const file of tracksFolderFileList) {
            // build the path to the individual file 
            const fileName = `${gmFolder}/${folder}/Tracks/${file}`;
            // push the filepath into the object 
            folderData.files.push(fileName);
        }
        // push all collected folder objects
        collectedData.push(folderData);
    }
    return collectedData;
}


/**
 * Reads a CSV file and converts it to an object 
 * Returned object now has a property of 'trackData' containg an array of objects parsed from the track files in the given folder 
 * * @returns an array containing an object for each playlist folder (similar to findAllFiles function)  
 */
const readFileData = () => {
    // get all file info (findAllFiles returns an array of objects)
    const fileData = findAllFiles();
    // loop through each folderObject in the array 
    for (const folderObject of fileData) {
        // create array which will hold each track objects 
        folderObject.trackData = [];
        // list of files in this folder 
        const filesToRead = folderObject.files;
        // loop through each file 
        for (const file of filesToRead) {
            // read the file as text (file is CSV format)
            const data = fs.readFileSync(file, 'utf-8');
            // parse the CSV data 
            const parsedData = parse(data, {columns: true, skip_empty_lines: true});
            // parsed CSV data is returned as an array with an object of the CSV data inside 
            // push the parsed data object into the trackData property of the folder object  
            folderObject.trackData.push(parsedData[0]);
        }
    }
    // return the object of all the folders that now has the parsed CSV track data
    return fileData;
}


const parsedFileData = readFileData();
console.log(parsedFileData[0].playlistName);
console.log(parsedFileData[0].trackData[5]);
