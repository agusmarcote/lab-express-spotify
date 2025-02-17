// require('dotenv').config();

// const express = require('express');
// const hbs = require('hbs');
// const SpotifyWebApi = require('spotify-web-api-node');




// const app = express();


// app.set('view engine', 'hbs');
// app.set('views', __dirname + '/views');
// app.use(express.static(__dirname + '/public'));



// // setting the spotify-api goes here:
// const spotifyApi = new SpotifyWebApi({
//     clientId: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET
//   });
  
//   // Retrieve an access token
//   spotifyApi
//     .clientCredentialsGrant()
//     .then(data => spotifyApi.setAccessToken(data.body['access_token']))
//     .catch(error => console.log('Something went wrong when retrieving an access token', error));

// // Our routes go here:

// app.get("/", (req, res) => {
//     res.render("homepage")
//   })

// app.get("/artist-search", async (req, res) => {
//     const artist = req.query.artist
//         try {
//             const searchAPI = await spotifyApi.searchArtists(artist)
//             console.log(searchAPI)
//             // console.log(searchAPI.body.artists.item)
             

//             res.send("", searchAPI.body.artists.items[0])
//         } catch(err){
//             console.log(err)
//         }
    
// })

// app.get('/artist-search', (req, res) => {
//     const {name} = req.query
//     console.log("This is the", name);
//     spotifyApi
//   .searchArtists(name)
//   .then(data => {
//     //console.log('The received data from the API: ', data.body.artists.items[0]);
//     let artists = data.body.artists.items;
//     // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
//     res.render("artist-search", {artists})
//   })
//   .catch(err => console.log('The error while searching artists occurred: ', err));
//});





require('dotenv').config();

const express = require('express');
const hbs = require('hbs');
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });
  
  // Retrieve an access token
  spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));


const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// setting the spotify-api goes here:


// Our routes go here:
app.get("/", (req, res) => {
    //const data = {}
  
    res.render("home", {layout: false})
  })


app.get("/artist-search", (req, res) => {
  const searchPhrase = req.query['search-phrase']
  spotifyApi
    .searchArtists(searchPhrase)
    .then(data => {
      //console.log('The received data from the API: ', data.body.artists.items);
      const articleList = data.body.artists.items
      res.render("artist-search-results", {articleList})
    })
    .catch(err => console.log('The error while searching artists occurred: ', err));
  
}) 

app.get("/albums/:id", (req, res) => {
  const id = req.params.id
  spotifyApi
  .getArtistAlbums(id)
    .then(data => {
      //console.log('The received data from the API: ', data.body.items);
      const albumList = data.body.items
      res.render("albums", {albumList})
    })
    .catch(err => console.log('The error while searching artists occurred: ', err));
})

app.get("/tracks/:id", (req, res) => {
  const id = req.params.id
  spotifyApi
  .getAlbumTracks(id)
    .then(data => {
      console.log('The received data from the API: ', data.body.items);
      const trackList = data.body.items
      res.render("tracks", {trackList})
    })
    .catch(err => console.log('The error while searching artists occurred: ', err));
})






app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));
