function getRandomNumber(lower, upper)
{
    return Math.floor((Math.random() * (upper - lower)) + lower);
}
function getPlayer()
{
    for (var i = 0; i < entlist.length; i++)
        if(entlist[i] instanceof Player)
            return entlist[i];
    return null;
}
function getPuck()
{
    for (var i = 0; i < entlist.length; i++)
        if(entlist[i] instanceof Puck)
            return entlist[i];
    return null;
}
function getScoreBoard()
{
    return scorebrd;
}
function allImagesLoaded()
{
    for (var i = 0; i < entlist.length; i++)
        if (entlist[i].img != null)
            if (!entlist[i].img.complete)
                return false;
    return true;
}
var SideEnum = {
    UP   : 0,
    DOWN : 1,
    RIGHT: 2,
    LEFT : 3,
    ERROR: 4
}
var SideString = [
    "up",
    "down",
    "right",
    "left",
    "error"
];
// checkSide(a,b) :  return what side entity A is to entity B
//
//   +-----+ 
//   |     |   +---+
//   |  a  |   | b |
//   |     |   +---+
//   +-----+ 
//
// In this illustration, a is to the left of b
// so, in this case, the function wil return SideEnum.LEFT
//
function checkSide(a, b)
{
    if (!(a instanceof Entity))
        return SideEnum.ERROR;
    if (!(b instanceof Entity))
        return SideEnum.ERROR;
    
    if (a.pos.x + a.w > b.pos.x + b.w && a.pos.x > b.pos.x + b.w) return SideEnum.LEFT ;
    if (b.pos.x + b.w > a.pos.x + a.w && b.pos.x > a.pos.x + a.w) return SideEnum.RIGHT;
    if (a.pos.y + a.h > b.pos.y + b.h && a.pos.y > b.pos.y + b.h) return SideEnum.DOWN ;
    if (b.pos.y + b.h > a.pos.y + a.h && b.pos.y > a.pos.y + a.h) return SideEnum.UP   ;
    
    return SideEnum.ERROR;
}
function checkCollision(a, b)
{
    if (!(a instanceof Entity))
        return false;
    if (!(b instanceof Entity))
        return false;
 
    var rect1 = {x: a.pos.x, y: a.pos.y, width: a.w, height: a.h}
    var rect2 = {x: b.pos.x, y: b.pos.y, width: b.w, height: b.h}
 
    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y)
    {
        return true;
    }
    return false;   
}
function addPuck()
{
    entlist.push(new Puck(canvas.width/2, canvas.height/2, 32, 32, "circles2.png", [2,3,4,5,4,3,2]));
}
function addPowerup(type)
{
    var randx = getRandomNumber(128, canvas.width - 128);
    var randy = getRandomNumber(128, canvas.height - 96);
    switch(type)
    {
        case PowerupType.SPEED:
        {
            entlist.push(new SpeedPowerup(randx, randy, 64, 64, "powerup.png", [0,1,2,3,4,5,4,3,2,1,0]));
            break;
        }
        case PowerupType.SLOW:
        {
            entlist.push(new SlowPowerup(randx, randy, 64, 64, "slowpowerup.png", [0,1,2,3,4,5,4,3,2,1,0]));
            break;
        }
    }
    current_powerups++;
}
function sound(src) 
{
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}
$(document).ready(function () 
{
     var canvas = $("#myCanvas")[0];
     var ctx = $("#myCanvas")[0].getContext("2d");
     var Fps = 60;
     scorebrd = new ScoreBoard();
     addPuck();    
     entlist.push(new Player(10, 10, 32, 64, "paddle.png", [0]));
     entlist.push(new ComputerPlayer(canvas.width - 42, canvas.height/2 - 42, 32, 64, "paddle.png", [0]));
     entlist.push(new Goal(0                , 0, 10, canvas.height, "darkblue", true ));
     entlist.push(new Goal(canvas.width - 10, 0, 10, canvas.height, "darkred" , false));
     entlist.push(new Wall(canvas.width/4, canvas.height/4, 64, 64, "spring_aa.png", [0,1,2,3,4]));
     entlist.push(new Wall(3 * canvas.width/4 - 32, 3 * canvas.height/4 - 32, 64, 64, "spring_aa.png", [0,1,2,3,4]));
     addPowerup();
     var game = setInterval(function ()
     {
         ctx.clearRect(0,0,cw,cw);
         if (!imagesLoaded)
             imagesLoaded = allImagesLoaded();
         else
         {
             for (var i = 0; i < entlist.length; i++)
             {
                 entlist[i].draw();
                 entlist[i].update();
             }
             scorebrd.display();
         }
         gameoptions.time++;
         if (current_powerups <= gameoptions.max_powerups)
            if (getRandomNumber(0, 2) == 0) addPowerup(0);
            else                            addPowerup(getRandomNumber(0, 2));
     }, 1000 / Fps);
 });

var sound_bump = new sound("bump.mp3");
var sound_ping = new sound("ping.mp3");
var sound_goal = new sound("goal.mp3");
var sound_spup = new sound("bwop.mp3");
var sound_sldn = new sound("bowp.mp3");

var scorebrd = null;
var pucks = [];

var isUpArrowPressed = false;
var isDownArrowPressed = false;
 
var vendors = ['webkit', 'moz'];
for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
}
 
var entlist = [];
var current_powerups = 0;
var gameoptions =
{
    time: 0,
    max_powerups: 1   
};
var canvas = document.getElementById('myCanvas'),
            cw = canvas.width,
            ch = canvas.height,
            ctx = canvas.getContext('2d'),
            fps = 60,
            bX = 30,
            bY = 30,
            mX = 10,
            mY = 20;
var imagesLoaded = false;
 
window.onkeydown = function(e)
{
    var key = e.keyCode ? e.keyCode : e.which;
    if (key == 38) isUpArrowPressed   = true;
    if (key == 40) isDownArrowPressed = true;
}
 
window.onkeyup = function(e)
{
    var key = e.keyCode ? e.keyCode : e.which;  
    if (key == 38) isUpArrowPressed   = false;
    if (key == 40) isDownArrowPressed = false;  
}