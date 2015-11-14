var Player = require('../models/Player');

// For dealing with Emails we need to create a mail object using the package installed 'nodemailer'
var nodemailer = require('nodemailer');
// This var give data from sender, the app, in this case, me for testing
var transport = nodemailer.createTransport("SMTP", {
    host: "smtp.gmail.com", // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    auth: {
        // user: EMAIL_SIMON,
        // pass: PASSWORD_EMAIL_SIMON
        user: "john@doe.com",
        pass: "12345678"
    }
});

// GET ALL PLAYERS
function getAll(request, response) {  
  Player.find(function(error, players) {
    if(error) response.json({message: 'Could not find any player'});
    response.json({players: players});
  }).select('-__v');
}

// FIND A PLAYER'S DATA
function findPlayerData(request, response) {
  console.log('Hitting findPlayerData for email at api');
  console.log('coming from email', request.params.email)
  var email = request.params.email;
  Player.find({'email': email}, function(error, player) {
    if(error) response.json({message: 'Could not find player b/c:' + error});
    // If find a match in DB get name/alias and send info to player
    console.log("the name asociated to the email is: ", player[0].name);
    // Now we're creating the mail structure
    var subject = "This are your details from Simon Game APP"
    var text = "This is your user name or alias: " + player[0].name + ", and this is your email: " + email;
    var mailOptions = {
      to : email,
      subject : subject,
      text : text
    }
    console.log(mailOptions);
    // Sending email using the object we created at the beginning of this page
    transport.sendMail(mailOptions, function(error, res){
      if(error){
        console.log(error);
        res("error");
      }else{
        console.log("Message sent: " + res.message);
        // res("sent");
      }
      mailOptions = {};
    });
    response.json({message: '"Email send to Player successfully"', player: player[0].name});
  }).select('-__v');
}

// POST A NEW PLAYER
function createPlayer(request, response) {
  console.log('Hitting createPlayer at api');
  console.log(request.body)
  var newPlayer = new Player(request.body);
  newPlayer.save(function(error) {
    if(error) response.json({messsage: 'Could not create new player b/c:' + error});
    response.json({player: newPlayer});
  });
}

// GET A PLAYER
function getPlayer(request, response) {
  console.log('Hitting getPlayer at api')
  console.log('coming from :name', request.params.name)
  console.log('coming from :email', request.params.email)
  var email = request.params.email;
  var alias = request.params.name;

  Player.find({'email': email, 'name': alias}, function(error, player) {
    if(error) response.json({message: 'Could not find player b/c:' + error});
      // If no error 'player' is the object we where looking for
      var dbName = player[0].name;
      if(dbName == alias) { // If name at DB and name from input are same
        response.json({player: player});
      } else {
        response.json({message: 'User is not registered or email or password was wrong'});
      }
  }).select('-__v');
}


module.exports = {
  getAll: getAll,
  createPlayer: createPlayer,
  getPlayer: getPlayer,
  findPlayerData: findPlayerData
}