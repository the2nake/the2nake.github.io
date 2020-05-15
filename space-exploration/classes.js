// Credit not needed but is appreciated.
// classes.js by Thuong

var killsound, lasersound, losesound;

function createSounds() {
    lasersound = resources["audio/sfx_laser2.ogg"];

    killsound = resources["audio/sfx_twoTone.ogg"];

    losesound = resources["audio/sfx_lose.ogg"];
}

function handleCircleCollision(key1, obj1, key2, obj2) {
    // comparision is ALWWAYS bullet is 1, player is 2
    var x1, x2, y1, y2, r1, r2;
    x1 = (obj1[key1].x + 14 * Math.cos(obj1[key1].rad)) * obj2[key2].scale;
    y1 = (obj1[key1].y + 14 * Math.sin(obj1[key1].rad)) * obj2[key2].scale;
    r1 = obj1[key1].boxradius * obj2[key2].scale ** 2;
    x2 = obj2[key2].x * obj2[key2].scale;
    y2 = obj2[key2].y * obj2[key2].scale;
    r2 = obj2[key2].boxradius * obj2[key2].scale ** 2;
    if (Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2) <= r1 + r2) {
        // return true;
        obj2[key2].health -= 10;
        obj2[key2].healspeed = 0;
        // confirmed collision
        if (player.health <= 0) {
            losesound.play();
            musicEl.src = "audio/defeat.ogg";
            musicEl.loop = false;
            musicEl.play();
            console.info("We have a loser!");
            var temp = obj2[key2];
            var finalscore = temp.score;
            temp.ctx.fillStyle = "black";
            temp.ctx.fillRect(0, 0, temp.canvas.width, temp.canvas.height);

            document.onclick = function () {
                location.reload(false); // load from cache
            };
            var s = function () {
                temp.ctx.fillStyle = "black";
                temp.ctx.fillRect(0, 0, temp.canvas.width, temp.canvas.height);
                temp.ctx.font = "48px Ken Vector Future";
                temp.ctx.textAlign = "center";
                temp.ctx.fillStyle = "red";
                temp.ctx.fillText("You Have Lost", temp.canvas.width / 2, temp.canvas.height / 2 - 32);
                temp.ctx.font = "32px Ken Vector Future Thin";
                temp.ctx.fillStyle = "white";
                temp.ctx.fillText("Your final score was: " + finalscore, temp.canvas.width / 2, temp.canvas.height / 2);
                temp.ctx.fillText("Click to Restart", temp.canvas.width / 2, temp.canvas.height / 2 + 32);
                window.cancelAnimationFrame(mainhdl);
                window.clearInterval(UIhdl);
                window.requestAnimationFrame(s);
            };
            s();
        } else {
            var img = resources["images/Lasers/laserRed08.png"];
            obj2[key2].ctx.drawImage(img, canvas.width * obj1[key1].x / 1000 - 24 * obj2[key2].scale, canvas.height * obj1[key1].y / 562.5 - 24 * obj2[key2].scale, 48 * obj2[key2].scale, 48 * obj2[key2].scale);
            delete obj1[key1];
        }
    }
}


class Ship {
    /**
     * Create an Ship object
     * @param sx Starting x position
     * @param sy Starting y position
     * @param canvas The canvas element
     */
    constructor(sx, sy, canvas) {
        {
            /** @type {CanvasRenderingContext2D} */
            this.ctx = canvas.getContext("2d");

            this.canvas = canvas;
        }
        /* Initializes the ship. sx is the starting x, sy is the starting y. */
        this.x = sx;
        this.y = sy;
        this.deg = 0; // 0 is up, 90 is right, 180 is bottom, 270 is left
        this.dx = 0;
        this.dy = 0;
        this.agility = 0.1;
        this.speed = 3;
        this.turningRadius = 12 / this.speed;
        this.scale = canvas.width / (33 * this.width);
        this.reload = true;
        this.dual = false;
        this.firespeed = 250;
    }
    /**
     * Updates the object
     */
    update() {
        this.scale = canvas.width / (33 * this.width);
        this.deg = this.deg % 360;
        this.rad = Math.PI * (this.deg - 90) / 180;
        if (this.image.complete) {
            this.x += this.dx;
            this.y += this.dy;
            // no drag in space!!! [very little]
            this.dx /= 1.001;
            this.dy /= 1.001;
            // rotate the image
            // Save the current context  
            this.ctx.save();
            this.ctx.translate(this.x * this.canvas.width / 1000, this.y * this.canvas.height / coordheight);
            this.ctx.rotate(this.rad + Math.PI / 2);
            this.ctx.drawImage(this.image, -this.width * this.scale / 2, -this.height * this.scale / 2, this.width * this.scale, this.height * this.scale);
            // And restore the context ready for the next loop 
            this.ctx.restore();

            // wrapping screen
            if (this.x >= 1000) {
                this.x = 0;
            }
            if (this.x < 0) {
                this.x = 1000;
            }
            if (this.y >= 562.5) {
                this.y = 0;
            }
            if (this.y < 0) {
                this.y = 562.5;
            }
        }
    }
    /**
     * Shoots a bullet
     * @param {String} color The color of the bullet. Can be "Green", "Red", or "Blue"
     */
    shoot(bullets, enemies, player, color) {
        if (this.dual) {
            let x = Math.random(); // any key is fine, but the keys must stay constant, so use object with random keys. 
            // You need 5 * 10 ^ 15 entities for that to overlap
            if (color === "Red") {
                bullets[x] = new Bullet(color, this.x + 10 * Math.cos(Math.PI / 180 * ((this.deg + 180) % 180)), this.y + 10 * Math.sin((this.deg + 180) % 180), (this.deg + 180) % 360, this.canvas, bullets, enemies, player, x);
            } else {
                bullets[x] = new Bullet(color, this.x + 10 * Math.cos(Math.PI / 180 * this.deg), this.y + 10 * Math.sin(Math.PI / 180 * this.deg), this.deg, this.canvas, bullets, enemies, player, x);
            }
            x = Math.random(); // any key is fine, but the keys must stay constant, so use object with random keys. 
            // You need 5 * 10 ^ 15 entities for that to overlap
            if (color === "Red") {
                bullets[x] = new Bullet(color, this.x - 10 * Math.cos(Math.PI / 180 * ((this.deg + 180) % 180)), this.y - 10 * Math.sin((this.deg + 180) % 180), (this.deg + 180) % 360, this.canvas, bullets, enemies, player, x);
            } else {
                bullets[x] = new Bullet(color, this.x - 10 * Math.cos(Math.PI / 180 * this.deg), this.y - 10 * Math.sin(Math.PI / 180 * this.deg), this.deg, this.canvas, bullets, enemies, player, x);
            }
        } else {
            let x = Math.random(); // any key is fine, but the keys must stay constant, so use object with random keys. 
            // You need 5 * 10 ^ 15 entities for that to overlap
            if (color === "Red") {
                bullets[x] = new Bullet(color, this.x, this.y, (this.deg + 180) % 360, this.canvas, bullets, enemies, player, x);
            } else {
                bullets[x] = new Bullet(color, this.x, this.y, this.deg, this.canvas, bullets, enemies, player, x);
            }
        }
    }

    /**
     * Acceleration
     */
    accelerate() {
        if (Math.sqrt(this.dx * this.dx + this.dy * this.dy) < this.speed) {
            this.dx += this.agility * Math.cos(this.rad);
            this.dy += this.agility * Math.sin(this.rad);
        }
    }
    /**
     * Turn left
     */
    left() {
        this.deg -= this.turningRadius;
    }
    /**
     * Turn right
     */
    right() {
        this.deg += this.turningRadius;
    }
}

class Player extends Ship {
    /**
     * Create a player object
     * @param sx Starting x position
     * @param sy Starting y position
     * @param canvas The canvas element
     * @param bullets The bullets object
     * @param enemies The enemies object
     */
    constructor(sx, sy, canvas, bullets, enemies) {
        super(sx, sy, canvas);
        this.image = resources["images/playerShip2_blue.png"];
        this.width = 112;
        this.height = 75;
        this.bullets = bullets;
        this.enemies = enemies;
        this.boxradius = 40;
        this.score = 0;
        this.agility = 0.3;
        this.speed = 5;
        this.health = 100;
        this.dual = false;
        this.healspeed = 0.2;
    }
    update() {
        super.update();
        if (this.healspeed < 0.2) {
            this.healspeed += 0.001;
        }

        this.health += this.healspeed;
        if (this.health > 100) {
            this.health = 100;
        }

        this.keys();
    }
    keys() {
        if (map.a || map.A || map.ArrowLeft) {
            this.left();
        }
        if (map.d || map.D || map.ArrowRight) {
            this.right();
        }
        if (map.w || map.W || map.ArrowUp) {
            this.accelerate();
        }
        if (map[" "] && this.reload === true) {
            this.reload = false;
            this.deg = (this.deg + 10) % 360;
            this.shoot(this.bullets, this.enemies, this, "Blue");

            this.deg = (this.deg - 20) % 360;
            this.shoot(this.bullets, this.enemies, this, "Blue");

            this.deg = (this.deg + 10) % 360;
            this.shoot(this.bullets, this.enemies, this, "Green");

            var me = this;
            window.setTimeout(function () {
                me.reload = true;
            }, this.firespeed);
        }
    }
}

class Enemy extends Ship {
    /**
     * Create an enemy object
     * @param sx Starting x position
     * @param sy Starting y position
     * @param canvas The canvas element
     */
    constructor(sx, sy, canvas, bullets, enemies, player, mykey, isCampaign = false, type = 0) {
        super(sx, sy, canvas);
        if (isCampaign) {
            this.type = type;
        } else {
            switch (Math.floor(Math.random() * 10) + 1) {
                case 1:
                    this.type = 1;
                    break;
                case 2:
                    this.type = 1;
                    break;
                case 3:
                    this.type = 1;
                    break;
                case 4:
                    this.type = 2;
                    break;
                case 5:
                    this.type = 2;
                    break;
                case 6:
                    this.type = 3;
                    break;
                case 7:
                    this.type = 3;
                    break;
                case 8:
                    this.type = 4;
                    break;
                case 9:
                    this.type = 5;
                    break;
                case 10:
                    this.type = 5;
                    break;
            }
        }
        switch (this.type) {
            case 1:
                this.image = resources["images/Enemies/enemyRed1.png"];
                this.width = 93;
                this.speed = 4;
                this.dual = true;
                this.firespeed = 750;
                break;
            case 2:
                this.image = resources["images/Enemies/enemyRed2.png"];
                this.width = 104;
                this.speed = 3;
                this.dual = true;
                this.firespeed = 500;
                break;
            case 3:
                this.image = resources["images/Enemies/enemyRed3.png"];
                this.width = 103;
                this.speed = 3;
                this.firespeed = 100;
                break;
            case 4:
                this.image = resources["images/Enemies/enemyRed4.png"];
                this.width = 82;
                this.speed = 1;
                this.dual = true;
                this.firespeed = 250;
                break;
            case 5:
                this.image = resources["images/Enemies/enemyRed5.png"];
                this.width = 97;
                this.speed = 2;
                this.firespeed = 750;
                break;
            default:
                this.image = resources["images/Enemies/enemyRed1.png"];
                this.width = 93;
                this.speed = 4;
                this.dual = true;
                this.firespeed = 750;
                break;
        }

        this.height = 84;
        this.circleRadius = Math.random() * 50;
        this.circleMovement = Math.random() * 2;
        this.circling = false;
        this.boxradius = 20;
        this.bullets = bullets;
        this.enemies = enemies;
        this.mykey = mykey;
        this.player = player;
        this.active = false;

        var me = this;

        window.setTimeout(function () {
            me.active = true;
        }, this.type * 1000);
    }
    /**
     * Updates the enemy
     */
    update() {
        super.update();
        this.scale = canvas.width / (40 * this.width);
        this.track();
    }
    /**
     * Track the player and follow
     */
    track() {
        this.diffx = this.x - player.x;
        this.diffy = this.y - player.y;
        let randArr = [1, -1];
        this.targetAngle = 180 + (180 * Math.atan2(this.diffy, this.diffx) / Math.PI + 270) % 360 + 5 * Math.random() * randArr[Math.floor(Math.random() * 2)];

        if (Math.abs(this.deg - this.targetAngle) < 20) {
            this.deg = this.targetAngle;
        } else if (Math.abs(this.deg - this.targetAngle) > 340) {
            this.deg = this.targetAngle;
        }

        if (Math.abs((this.deg + this.turningRadius) - this.targetAngle) % 360 < Math.abs(this.deg - this.targetAngle) % 360) {
            /**
             * If it gets you closer, do it
             */
            this.right();
        } else {
            this.left();
        }

        let i = 0;
        while ((this.diffx ** 2 + this.diffy ** 2) ** (1 / 2) < 100 + this.circleRadius && i < 4) {
            this.x -= Math.sign(this.dx);
            this.y -= Math.sign(this.dy);
            this.diffx = this.x - player.x;
            this.diffy = this.y - player.y;

            // wrapping screen
            if (this.x >= 1000) {
                this.x = 0;
            }
            if (this.x < 0) {
                this.x = 1000;
            }
            if (this.y >= 562.5) {
                this.y = 0;
            }
            if (this.y < 0) {
                this.y = 562.5;
            }
            i++; // safety of CPU protection :)
        }

        if (100 + this.circleRadius <= (this.diffx ** 2 + this.diffy ** 2) ** (1 / 2) && this.active) {
            if (Math.sqrt(this.dx * this.dx + this.dy * this.dy) < this.speed) {
                if (!isNaN(this.rad)) {
                    this.dx += -0.05 * Math.cos(this.rad);
                    this.dy += -0.05 * Math.sin(this.rad);
                }
            }
        }

        if ((this.diffx ** 2 + this.diffy ** 2) ** (1 / 2) <= 400) {
            this.active = true;
        }

        if (!this.active) {
            this.dx = 0;
            this.dy = 0;
        }


        if (100 + this.circleRadius - 2 < (this.diffx ** 2 + this.diffy ** 2) ** (1 / 2) < 100 + this.circleRadius + 2) {
            // in a circle orbit
            if (!this.circling) {
                this.dx += this.circleMovement * Math.cos(Math.PI * (90 + this.deg) / 180);
                this.dy += this.circleMovement * Math.sin(Math.PI * (90 + this.deg) / 180);
            }
            this.circling = true;
        } else {
            this.circling = false;
        }
        var me;
        if (this.reload && this.active) {
            this.reload = false;
            this.shoot(this.bullets, this.enemies, this.player, "Red");
            me = this;
            window.setTimeout(function () {
                me.reload = true;
            }, this.firespeed);
        }
    }
}

class Bullet {
    constructor(color, x, y, deg, canvas, bullets, enemies, player, mykey) {
        this.color = color;
        this.player = player;
        this.x = x;
        this.y = y;
        this.mykey = mykey;
        this.deg = deg;
        this.rad = Math.PI * (this.deg - 90) / 180;
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.color = color;
        this.image = resources["images/Lasers/laser" + color + "07.png"];
        this.width = 9;
        this.height = 37;
        this.boxradius = 5; // will be shifted to top
        // center (x,y) with be 14 pixels shifted up.
        // outsider function will check
        // 14*cos(deg) = xcomponent
        // 14*sin(deg) = ycomponent
        this.dx = 0;
        this.dy = 0;
        this.ticks = 0;
        this.bullets = bullets;
        this.enemies = enemies;
        this.scale = player.scale;

        if (this.color === "Blue" || this.color === "Green") {
            lasersound = resources["audio/sfx_laser2.ogg"];
            lasersound.play();
        }
    }
    update() {
        if (this.image.complete) {
            this.ticks += 1;
            this.scale = player.scale;
            this.dx = 7 * Math.cos(this.rad);
            this.dy = 7 * Math.sin(this.rad);

            this.ctx.save();
            this.ctx.translate(this.x * this.canvas.width / 1000, this.y * this.canvas.height / coordheight);
            this.ctx.rotate(this.rad + Math.PI / 2);
            this.ctx.drawImage(this.image, -this.width * this.scale / 2, -this.height * this.scale / 2, this.width * this.scale, this.height * this.scale);
            // And restore the context ready for the next loop 
            this.ctx.restore();

            this.x += this.dx;
            this.y += this.dy;
        }
        if (this.color === "Green" || this.color === "Blue") {
            for (let i = 0; i < Object.keys(this.enemies).length; i++) {
                let COVID19 = this.enemies[Object.keys(this.enemies)[i]];
                if (Math.sqrt((COVID19.x - this.x) ** 2 + (COVID19.y - this.y) ** 2) < COVID19.boxradius) {

                    var img = document.createElement("img");
                    img.src = "images/Lasers/laser" + this.color + "08.png";
                    this.ctx.drawImage(img, canvas.width * this.x / 1000 - 24 * this.enemies[COVID19.mykey].scale, canvas.height * this.enemies[COVID19.mykey].y / 562.5 - 24 * this.enemies[COVID19.mykey].scale, 48 * this.enemies[COVID19.mykey].scale, 48 * this.enemies[COVID19.mykey].scale);

                    delete this.bullets[this.mykey];
                    delete this.enemies[COVID19.mykey];
                    killsound = resources["audio/sfx_twoTone.ogg"];
                    killsound.play();

                    this.player.score += 100;
                }
            }
        } else if ((this.player.x - this.x) < 30 && (this.player.y - this.y) < 30) { // broad sweeps
            handleCircleCollision(this.mykey, this.bullets, 0, {
                0: this.player,
            }); // surgical strikes
        }

        if ((this.ticks > 100 && this.color == "Red") || (this.ticks > 200 && this.color != "Red")) {
            delete this.bullets[this.mykey];
        }
    }
}

class HUD {
    constructor(context) {
        /** @type {CanvasRenderingContext2D} */
        this.c = context;
        this.numImgList = [];
        for (let i = 0; i < 10; i++) {
            this.numImgList.push(resources["images/UI/numeral" + i + ".png"]);
        }
        this.mode = undefined;
        this.levelArr = [];
        this.scoreArr = [];
    }
    display() {
        this.displayScore(player.score);
        this.displayHealth(player.health);
        if (this.mode) {
            // campaign
            this.displayLevel(player.level);
        }
    }
    displayScore(score) {
        this.scoreArr = (score + "").split("");
        for (let i = 0; i < this.scoreArr.length; i++) {
            this.c.drawImage(this.numImgList[this.scoreArr[i]], canvas.width - 19 * (this.scoreArr.length - i) - 10, 10);
        }
        this.c.strokeStyle = "grey";
        this.c.fillStyle = "white";
        this.c.lineWidth = 4;
        this.c.font = "24px Ken Vector Future";
        if (this.levelArr.length >= this.scoreArr.length) {
            this.c.strokeText("SCORE: ", canvas.width - 19 * this.levelArr.length - 130, 27);
            this.c.fillText("SCORE: ", canvas.width - 19 * this.levelArr.length - 130, 27);
        } else {
            this.c.strokeText("SCORE: ", canvas.width - 19 * this.scoreArr.length - 130, 27);
            this.c.fillText("SCORE: ", canvas.width - 19 * this.scoreArr.length - 130, 27);
        }
    }
    displayHealth(health) {
        c.fillStyle = "#ff8b26";
        c.strokeStyle = "#ff005d";
        c.lineWidth = 4;
        c.strokeRect(10, 10, 500 * canvas.width / coordwidth, 20 * canvas.height / coordheight);

        c.fillRect(12, 12, health * 5 * canvas.width / coordwidth - 4, 20 * canvas.height / coordheight - 4);
    }
    displayLevel(level) {
        this.levelArr = (level + "").split("");
        for (let i = 0; i < this.levelArr.length; i++) {
            this.c.drawImage(this.numImgList[this.levelArr[i]], player.canvas.width - 19 * (this.levelArr.length - i) - 10, 36);
        }
        this.c.strokeStyle = "grey";
        this.c.fillStyle = "white";
        this.c.lineWidth = 4;
        this.c.font = "24px Ken Vector Future";
        if (this.levelArr.length >= this.scoreArr.length) {
            this.c.strokeText("LEVEL: ", canvas.width - 19 * this.levelArr.length - 130, 54);
            this.c.fillText("LEVEL: ", canvas.width - 19 * this.levelArr.length - 130, 54);
        } else {
            this.c.strokeText("LEVEL: ", canvas.width - 19 * this.scoreArr.length - 130, 54);
            this.c.fillText("LEVEL: ", canvas.width - 19 * this.scoreArr.length - 130, 54);
        }
    }
}