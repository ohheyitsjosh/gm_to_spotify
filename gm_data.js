const fs = require('fs'); 


function googleMusicData() {
    const playlistFolders = fs.readdirSync(gmDir);

    playlistFolders.forEach(playlistFolder => {
        musicData[playlistFolder] = []
    });
    
    playlistFolders.map(playlistFolder => {
        const folderPath = `${gmDir}/${playlistFolder}/Tracks`;
        const folderFiles = fs.readdirSync(folderpath);
    });
    
    
}

export default googleMusicData;

