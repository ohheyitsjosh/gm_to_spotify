# gm_to_spotify
A node script to recreate Google Music playlists in spotify. I had older playlists in Google Music and Google had prompted me to do something with the data as they are shutting down the service. 

For sentimental reasons, I wanted to recreate these playlists elsewhere, specifically Spotify which is my current music service of choice. 

* This project is based on the file and directory structure that was created by Google Takeout when requesting a download of your Google Music data. 
* Google Music folder location as well as Spotify API credentials are stored in a seperate config file not included in the package 

---

### Assumed File Structure 
Google Takeout provided the information in the following format: 

1. Google Play Music (Directory)
2. Playlists (Directory)
3. (Directory)
4. Tracks (Directory)
5. Individual files with the name of each track in .csv format 
  * Each file contained the following data:  Title	Album	Artist	Duration (ms)	Rating	Play Count	Removed	Playlist Index
