var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

var playersController = require('../controllers/players');

// http://127.0.0.1:3000/players
router.route('/players')

  //GET all players
  .get(playersController.getAll)

  //POST a new player
  .post(playersController.createPlayer);


router.route('/players/:id')

  // GET return specific player
  .get(playersController.getPlayer)

  // PATCH update existing player
  .patch(playersController.updatePlayer)

  // DELETE remove specific player from DB
  .delete(playersController.removePlayer);


module.exports = router