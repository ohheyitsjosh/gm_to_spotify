const fs = require('fs'); 
const csv = require('csv-parser')

/**
 * Function browses through a directory of files
 * Produced by google music 
 * and 
 * @returns An object with keys that represenet each playlist folder. 
 * Values for those keys are an array of objects represening song and artist info 
 * As captured from the csv files
 */

function googleMusicData() {
    // this object will be returned and will store all data 
    const musicData = {};

    // get all folders in the main directory 
    const playlistFolders = fs.readdirSync(gmDir);

    // create keys in the object for each individual folder name 
    playlistFolders.forEach(playlistFolder => {
        musicData[playlistFolder] = []
    });
    
    // loop through each individual playlist folder 
    playlistFolders.map(playlistFolder => {
        const folderPath = `${gmDir}/${playlistFolder}/Tracks`;
        // get all files within the playlist folder 
        const folderFiles = fs.readdirSync(folderpath);
        for (const file of folderFiles) {
            fs.createReadStream(file)
                .pipe(csv())
                .on('data', (data) => {console.log(data)})
                .on('end', () => {console.log('done')})

        }
    });
    
    
}

export default googleMusicData;

