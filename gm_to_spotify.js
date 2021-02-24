const Spotify = require('spotify-web-api-node');
const config = require('./config')
const gm_data = require('./gm_data');


const spotifyAPI = new Spotify({
    clientId: config.clientId,
    clientSecret: config.clientSecret
});

