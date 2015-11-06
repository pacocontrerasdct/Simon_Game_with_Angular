# Simon for the blind

For my final project at the General Assembly course I decided to revisit my first project which was a javascript online version of SIMON, a famous electronic game of memory skill from the late 70's.

![Original Simon Game Board](https://upload.wikimedia.org/wikipedia/commons/9/99/OriginalSimon.jpg)

But this time I wanted to build it thinking in the blind, and with mobile first design to allow blind people play the game taking advantage of the mobile device touchscreen capability.

# Why did I build this?
Nowadays, we are living a digital revolution in which the Internet is connecting people and things, and digital data visualization is helping to organizations, both public and private, to understand what drives human beings in their social relationships and behaviours.
There is a clear tendency to use images to communicate ideas and concepts, but this trend is not having into account to a part of the society, the blind.

![Sharing Data Visualization | MIT Technology Review](https://img.modern-house.us/medium/3/data%20visualization.jpg)

If we speak about games, videogames to be more accurate, the gap is even wider, and while spectacular games like Assassins Creed, Halo5 or Need for Speed make gamers hit the roof, visually-impaired gamers can't enjoy it because of lack of accessibility. 

Indeed, I did a small research about games which have into account this disability, and the amount of them in comparison with normal ones is ridiculous.
There is a recent [article][bl-art-1] about accessibility in terms of games which have into account visually-impaired people, that shows there is still a long way to make possible the complete integration between normal people and the blind.
Only the VoiceOver option that Apple implements in its devices allow blind gamers play to those games which are more or less accesible or strictly built as sound games. Indeed, there is an online [community for the blind] [bl-art-2] which is especifically related to this feature of Apple products.

On top of all my words, I have to say that as an Art teacher, some years ago I had to teach art techniques to a blind student; for that reason I attended to a specific course to learn how to teach visually-impaired people.
Since that period, I feel some kind of sensitivity to this issue.

# Game Mechanics
Simon is a game which challenge the player memory.
The mechanics of the game is simple: there is a board divided into four square sections.

![Screenshot: The game board](http://imgur.com/bUMaYdc.png)

Each one has a different color (blue, yellow, red and green)
and a round of the game consist in the app presents a sort of pattern in which one or more of this squares change its color into a lighter one (it's like blinking); then, after that, the player has to touch/click the screen to repeat in order that pattern to score and to advance to the next level.

Scoring is a combination of the number of elements of the pattern and the level of difficulty in which the player is. As an example, level 1 has one element, and if the player pass it, the score is 1x10 points, level 2, 2x10points and so on.

![screenshot: The score](http://imgur.com/bUMaYdc)

The pattern is growing accumulatively, getting more complicated to remember while player is passing levels.

To make the game accessible to the blind the application' structure is organize having as reference points the edge of the cellular (top-left of the screen, top-right, and so on); added a voice over to explain how the structure is being built, where to find the buttons to use the application and how to play.

![screenshot: How the board blinks](http://imgur.com/bUMaYdc)

Then, like in the original game, each colored square in the board has a specific sound that sounds every time that a square blinks. So a blind person can follow the pattern of the computer, and if he/she remembers which sound belongs to which edge of the screen, can repeat the pattern and playing this game.

There is no winner at the end, but there is a hall of fame in which it is listed the ten logged players who have the highest scores.

![screenshot: Hall of fame](http://imgur.com/bUMaYdc)

# Technologies I've used
My aim was to use a full-stack architecture based in one of the frameworks I learnt in this course to build a working game application with at least the basic functionality to be played. 
We only had 7 days to develop the app before the presentation to the class so there were not much time to take it further than the MVP.
I built a single page application with AngularJS making the application reacts faster and giving users a better experience.

## Back-End
I'm using NodeJS as server, Express for routing, MongoDB/ Mongoose to record data from the players, and nodemailer module to send emails to users in case they forget their username.

## Front-End
For my front-end I chose to use AngularJs framework because it was the last lesson we learnt in the WDI course and I wanted to try it a bit more, and because it is a JavaScript-based framework I thought could be suitable to work together with the jQuery library I used in my first project to build the first version of SIMON game.
AngularJS is helping me connecting the front and back-end to call to the database. The ui.router module helps me to render the views and to have a single page application.
For my css styles I decided to use purecss because of its simplicity but at the same time its minimalist style, and added some css animations from the cool library [animate.css][animateCSS]

# Drawbacks
I refactored a lot the script file that contents the main functions for playing the game, and even change some function behaviours for simplicity issues, but I feel that I should have used Angular directives instead of jQuery resources to get working more of the Angular power.
Because of lack of time, I mess with some kind of mock authentication (something temporary) to give users the sensation of being using a more complex system application. Instead, I should have used a middleware resource like passport.js.
# Future improvement
In terms of authentication, as I said in the previous paragraph, implementing passport.js is a must so I will try to get it working first.
Another improvement for the app I think it would be interesting to have is an 'off' button to turn all elemets in the page into black color, allowing normal people playing the game just as a blind person will do.

In relation to this, a view page presenting some statistics could be interesting: average of blind/normal people players, compare scores...
A multiplayer option is another interesting improvement to allow group of friends/people play together in turns.


# Related links:
- [Moss, Richard: "Blind Games: The next battleground in accessibility"] [bl-art-3]
- [Data Visualization and the Blind][dataVisualizationAndTheBlind]


<links to external sites>
[bl-art-1]: <http://toucharcade.com/2015/05/06/blind-gamers-are-embracing-developers-who-have-an-eye-for-accessibility>
[bl-art-2]: <http://www.applevis.com>
[bl-art-3]: <http://www.polygon.com/features/2013/8/6/4550490/blind-games-rock-vibe>

[animateCSS]: <https://github.com/daneden/animate.css>
[dataVisualizationAndTheBlind]: <https://www.perceptualedge.com/blog/?p=1756>
