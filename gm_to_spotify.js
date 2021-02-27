const Spotify = require('spotify-web-api-node');
const config = require('./config')
// const gm_data = require('./get_data');


const spotifyAPI = new Spotify(config.credentials);

const authorizeURL = spotifyAPI.createAuthorizeURL(config.scopes);
console.log(authorizeURL);

// spotifyAPI.searchArtists('Charli XCX')
//   .then(function(data) {
//     console.log('Search artists by "Charli XCX"', data.body);
//   }, function(err) {
//     console.error(err);
//   });