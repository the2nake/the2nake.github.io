var canvas = /** @type {HTMLCanvasElement} */ document.createElement("canvas");
canvas.width = document.getElementsByTagName("body")[0].clientWidth * 0.6;
canvas.height = 9 * canvas.width / 16;
var coordwidth = 1000;
var coordheight = 562.5; // dynamic canvas scaling.

document.getElementById("canvasBackDiv").appendChild(canvas);
if (canvas.getContext) {
    /** @type {CanvasRenderingContext2D} */
    var c = canvas.getContext('2d');
}
var enemies = {}; var bullets = {}; var player, mainhdl;
var HUDobj = new HUD(c);
var mute = false;

// draw the background
c.clearRect(0, 0, canvas.width, canvas.height);
var img = document.createElement("img");
img.src = "images/background.jpg";
c.drawImage(img, 0, 0, canvas.width, canvas.height);

var endless = function () {
    HUDobj.mode = false; // endless mode
    endlessb.style.display = "none";
    campaignb.style.display = "none";
    // resize canvas accordingly
    canvas.width = document.getElementsByTagName("body")[0].clientWidth * 0.6;
    canvas.height = 9 * canvas.width / 16;
    // draw background
    c.clearRect(0, 0, canvas.width, canvas.height);
    var img = document.createElement("img");
    img.src = "images/background.jpg";
    c.drawImage(img, 0, 0, canvas.width, canvas.height);
    // mute audio
    if (mute) {
        lasersound.volume = 0;
        killsound.volume = 0;
        losesound.volume = 0;
    } else {
        lasersound.volume = 0.25;
        killsound.volume = 0.5;
        losesound.volume = 1;
    }
    try {
        /*for (let _ in Object.keys(bullets)) {
            bullets[Object.keys(bullets)[_]].update();
            if (bullets[Object.keys(bullets)[_]].color == "Red") {
                alert("It has been found.");
            }
        }*/
        for (let i = 0; i < Object.keys(bullets).length; i++) {
            bullets[Object.keys(bullets)[i]].update();
        }

        for (let i = 0; i < Object.keys(enemies).length; i++) {
            enemies[Object.keys(enemies)[i]].update();
        }
        player.update();
    } catch (TypeError) {}

    if (Math.floor(Math.random() * 100) == 1) {
        var x = Math.random();
        enemies[x] = (new Enemy(Math.random() * coordwidth, Math.random() * coordheight, canvas, bullets, enemies, player, x));
    }
    // HUD
    c.fillStyle = "#ff8b26";
    c.strokeStyle = "#ff005d";
    c.lineWidth = 4;
    c.strokeRect(10, 10, 500 * canvas.width / coordwidth, 20 * canvas.height / coordheight);
    c.fillRect(10, 10, player.health * 5 * canvas.width / coordwidth, 20 * canvas.height / coordheight);

    HUDobj.display();
    // recursively call the next frame
    mainhdl = requestAnimationFrame(endless);
};

var campaign = function () {
    HUDobj.mode = true; // campaign
    endlessb.style.display = "none";
    campaignb.style.display = "none";
    // resize canvas accordingly
    canvas.width = document.getElementsByTagName("body")[0].clientWidth * 0.6;
    canvas.height = 9 * canvas.width / 16;
    // draw background
    c.clearRect(0, 0, canvas.width, canvas.height);
    var img = document.createElement("img");
    img.src = "images/background.jpg";
    c.drawImage(img, 0, 0, canvas.width, canvas.height);
    // mute audio
    if (mute) {
        lasersound.volume = 0;
        killsound.volume = 0;
        losesound.volume = 0;
    } else {
        lasersound.volume = 0.25;
        killsound.volume = 0.5;
        losesound.volume = 1;
    }
    try {
        /*for (let _ in Object.keys(bullets)) {
            bullets[Object.keys(bullets)[_]].update();
            if (bullets[Object.keys(bullets)[_]].color == "Red") {
                alert("It has been found.");
            }
        }*/
        for (let i = 0; i < Object.keys(bullets).length; i++) {
            bullets[Object.keys(bullets)[i]].update();
        }

        for (let i = 0; i < Object.keys(enemies).length; i++) {
            enemies[Object.keys(enemies)[i]].update();
        }
        player.update();
    } catch (TypeError) {}

    if (Math.floor(Math.random() * 100) == 1) {
        var x = Math.random();
        enemies[x] = (new Enemy(Math.random() * coordwidth, Math.random() * coordheight, canvas, bullets, enemies, player, x));
    }
    // HUD
    c.fillStyle = "#ff8b26";
    c.strokeStyle = "#ff005d";
    c.lineWidth = 4;
    c.strokeRect(10, 10, 500 * canvas.width / coordwidth, 20 * canvas.height / coordheight);
    c.fillRect(10, 10, player.health * 5 * canvas.width / coordwidth, 20 * canvas.height / coordheight);

    HUDobj.display();
    // recursively call the next frame
    mainhdl = requestAnimationFrame(campaign);
};

var endlessb = document.createElement("img");
endlessb.src = "./images/UI/endless.png";
endlessb.style.position = "absolute";
endlessb.style.width = 222 * canvas.width / 550 + "px";
endlessb.style.height = 39 * canvas.width / 550 + "px";
endlessb.style.top = ((canvas.getBoundingClientRect().top + canvas.height / 2) - 39 * canvas.width / 1100) + 50 + "px";
endlessb.style.left = ((canvas.getBoundingClientRect().left + canvas.width / 2) - 222 * canvas.width / 1100) + "px";
document.body.appendChild(endlessb);

var campaignb = document.createElement("img");
campaignb.src = "./images/UI/campaign.png";
campaignb.style.position = "absolute";
campaignb.style.width = 222 * canvas.width / 550 + "px";
campaignb.style.height = 39 * canvas.width / 550 + "px";
campaignb.style.top = ((canvas.getBoundingClientRect().top + canvas.height / 2) - 39 * canvas.width / 1100) - 50 + "px";
campaignb.style.left = ((canvas.getBoundingClientRect().left + canvas.width / 2) - 222 * canvas.width / 1100) + "px";
document.body.appendChild(campaignb);

endlessb.addEventListener("click", function() {player = new Player(coordwidth/2, coordheight/2, canvas, bullets, enemies); endless();});
campaignb.addEventListener("click", function() {player = new Player(coordwidth/2, coordheight/2, canvas, bullets, enemies); campaign();});