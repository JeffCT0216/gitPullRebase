const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const table = require("../Database/index.js");
const context = table.knex;
const moment = require("moment");
var port = process.env.PORT || 8080;
var now = moment();
let artistId = "";
let userId = "";
var a = 0;
const saveUser = require("../Database/dbFunction.js").saveUser;
const checkArtistTable = require("../Database/dbFunction.js").checkArtistTable;
const checkUsersTable = require("../Database/dbFunction.js").checkUsersTable;
const getArtists = require("../Database/dbFunction.js").getArtists;
const getArtistsByGenre = require("../Database/dbFunction.js").getArtistsByGenre;
const getTracks = require("../Database/dbFunction.js").getTracks;
const getChatrooms = require("../Database/dbFunction.js").getChatrooms;
const getCurrentUser = require("../Database/dbFunction.js").getCurrentUser;
const getChatrooms2 = require("../Database/dbFunction.js").getChatrooms2;
const getArtistChatrooms = require("../Database/dbFunction.js").getArtistChatrooms;
const getMessageSender = require("../Database/dbFunction.js").getMessageSender;

app.use(bodyParser.json());
app.use(express.static(__dirname + "/../client/dist"));

app.post("/initArtists", (req, res) => {
  let city = req.body.city;
  getArtists(city).then(artists => {
    res.json(artists);
  });
});

app.post("/initArtistByGenre", (req, res) => {
  let genre = req.body.genre;
  let city = req.body.city;
  getArtistsByGenre(genre, city).then(artists => {
    res.json(artists);
  });
});

app.post("/initTracks", (req, res) => {
  let artist = req.body.artist;
  getTracks(artist).then(tracks => {
    res.json(tracks);
  });
});

app.post("/user", (req, res) => {
  ++a;
  var formatted = now.format("YYYY-MM-DD HH:mm:ss Z");

  let input = { artist: "", message: "" };
  input.artist = req.body.artist;
  input.message = req.body.message;
  input.user = req.body.user;

  // retrieve id for user and artist
  table.Artist.forge()
    .query()
    .select()
    .where("username", "=", input.artist)
    .then(function(model) {
      artistId = model[0].id;
      table.User.forge()
        .query()
        .select()
        .where("username", "=", input.user)
        .then(function(model) {
          userId = model[0].id;
        })
        .then(function() {
          // posting data
          new table.Requested_Gigs({
            artist_id: artistId,
            user_id: userId,
            message: input.message, 
            artistName: input.artist
          })
            .save()
            .then(function() {})
            .catch(err => {
              console.log("ERROR: ", err);
            });
        });
    });

  res.status(201).send("succeeded");
});

app.post("/initialLogin", (req, res) => {
  let token = req.body.accessToken;
  let name = req.body.username;
  let facebook_id = req.body.facebookID;

  //check if user is an artist in our "artist" table
  checkArtistTable(name)
    .then(userObj => {
      let bool = true;
      if (userObj !== null && userObj.length > 0) {
        bool = true;
      } else {
        bool = false;
      }
      //save user into users database
      saveUser(name, token, facebook_id, bool);
    })
    .then(() => {
      res.send();
    });
});

app.post("/userCheck", (req, res) => {
  let facebookID = req.body.facebookId;
  checkUsersTable(facebookID).then(userObj => {
    res.json(userObj);
  });
});

app.post("/chatrooms", (req, res) => {
  let userId = req.body.userId;
  getChatrooms(userId).then(chatroomsObj => {
    res.json(chatroomsObj);
  });
});

app.post("/artistChatrooms", (req, res) => {
  let userId = req.body.userId;
  getArtistChatrooms(userId).then(chatroomsObj => {
    res.json(chatroomsObj);
  });
});


app.post("/currentUser", (req, res) => {
  let facebookId = req.body.facebookId;
  getCurrentUser(facebookId).then(userObj => {
    res.json(userObj);
  });
});

app.post('/messageSender', (req, res) => {
  let user_id = req.body.user_id;
  console.log('user id in post req', req.body);
  getMessageSender(user_id).then(userObj => {
    res.json(userObj);
  });
});

app.listen(port, () => {
  console.log("Listening on port ", port);
});
