const table = require("./index.js");
let context = table.knex;

/** saveUser
 * @param  {string} name name of user
 * @param  {string} token token generated by Facebook when user logs in
 * @param  {string} facebookId user's Facebook ID
 * @param  {boolean} boolean true if artist, false if user
 */
let saveUser = (name, token, facebookId, boolean) => {
  this.checkUsersTable(facebookId).then(userObj => {
    if (userObj === null || userObj.length < 1) {
      new table.User({
        facebookID: facebookId,
        username: name,
        token: token,
        role: boolean
      })
        .save()
        .then(() => {
          context.destroy();
        });
    }
  });
};

/** getArtist gets Artists specifically from the inputted city
 * @param  {string} city city inputted by user
 */
let getArtists = city => {
  return table.Artist.forge()
    .where("city", "=", city)
    .query()
    .select();
};

/** getTracks gets all the tracks from the artist
 * @param  {string} artist name of artist
 */
let getTracks = artist => {
  return table.Single.forge()
    .where("artist", "=", artist)
    .query()
    .select();
};

/** checkArtistTable checks the Artist table in the database whether the name exists
 * @param  {string} name name of user that is passed in
 */
let checkArtistTable = name => {
  return table.Artist.forge()
    .where("username", "=", name)
    .query()
    .select();
};

/** checkUsersTable checks Users table in the database using his or her Facebook ID
 * @param  {string} facebookID Facebook ID of user that is passed in
 */
let checkUsersTable = facebookID => {
  return table.User.forge()
    .where("facebookID", "=", facebookID)
    .query()
    .select();
};

/** getChatrooms gets all the messages between a specific user and their recipient from the Requested_Gigs table
 * @param  {integer} userId ID of the specified user that is fetched from the users table in the database
 */
let getChatrooms = userId => {
  return table.Requested_Gigs.forge()
    .where("user_id", "=", userId)
    .query()
    .select();
};

/** getCurrentUser gets the specified user from the Users table using their Facebook ID
 * @param  {string} facebookId the user's facebookId
 */
let getCurrentUser = facebookId => {
  return table.User.forge()
    .where("facebookID", "=", facebookId)
    .query()
    .select();
};

module.exports.saveUser = saveUser;
module.exports.checkArtistTable = checkArtistTable;
module.exports.checkUsersTable = checkUsersTable;
module.exports.getArtists = getArtists;
module.exports.getTracks = getTracks;
module.exports.getChatrooms = getChatrooms;
module.exports.getCurrentUser = getCurrentUser;
