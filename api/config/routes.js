var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

var playersController = require('../controllers/players');

// http://127.0.0.1:3000/players
router.route('/players')
  // GET all players
  .get(playersController.getAll)

  // POST a new player
  .post(playersController.createPlayer);


router.route('/players/:email')
  // GET one player info for email it
  .get(playersController.findPlayerData);

router.route('/player/:name&:email')
  // GET return specific player
  .get(playersController.getPlayer);



module.exports = router