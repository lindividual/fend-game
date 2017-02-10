// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = getRandomInt(-500, -100);
    this.y = (getRandomInt(0, 2) + 1 ) * 70;
    this.speed = Math.random() * 200 + 50;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    //if the enemy run out of the canvas, reset it
    if(this.x > 600) {
        this.x = getRandomInt(-500, -100);
        this.y = (getRandomInt(0, 2) + 1 ) * 70;
        this.speed = Math.random() * 200 + 50;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.standBy = function(number) {
    allEnemies[number] = this;
    console.log("i am coming!");
};

// Now write your own player class
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 101;
    this.y = 400;
};
// This class requires an update(), render() and
Player.prototype.update = function() {
    if(this.y < 50) {
        alert("you win!");
        this.y = 400;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.hit = function(player) {
    this.y = 400;
};

// a handleInput() method.
Player.prototype.handleInput = function(userInput) {
        switch(userInput)
        {
            case 'left':
                if (this.x > 0) {
                    this.x -= 101;
                }
            break;
            case 'right':
                if (this.x < 83 * 4) {
                    this.x += 101;
                }
            break;
            case 'up':
                if (this.y > 0) {
                    this.y -= 83;
                }
            break;
            case 'down':
                if (this.y < 400) {
                    this.y += 83;
                }
            break;
        }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];

var generateEnemies = function(number) {
    for(var i = 0; i < number; i++) {
        var enemy = new Enemy();
        enemy.standBy(i);
    }
};

generateEnemies(6);
// Place the player object in a variable called player
var player = new Player();





// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//get random int
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
