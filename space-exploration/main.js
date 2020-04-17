// Credit not needed but is appreciated.
// main.js by Thuong

var canvas, coordheight, coordwidth, enemies, bullets, player, mainhdl, HUDobj, mute, endlessb, campaignb, muteb, img, initialhdl, campaign, endless, c, musicEl, ticks, UIhdl;
ticks = 0;

function main() {
    resources_loaded = Object.keys(resources).length;
    total_resources_needed = resource_name_list.length;
    document.getElementById("loadbar-progress").innerHTML = "<p>Loading... " + resources_loaded + "/" + total_resources_needed + "</p>";
    document.getElementById("loadbar-progress").style.width = "calc(" + resources_loaded + "*(100% - 6px)/" + total_resources_needed + ")";
    if (resources_loaded == total_resources_needed && ticks < 100) {
        ticks++;
    }
    if (resources_loaded == total_resources_needed && ticks >= 100) {
        createSounds();
        console.log("Hell, ya");
        document.getElementById("screen-overflow").style.display = "none";
        document.getElementById("loadbar-gradient").style.display = "none";
        document.getElementById("loadbar-outline").style.display = "none";
        document.getElementById("loadbar-progress").style.display = "none";


        canvas = /** @type {HTMLCanvasElement} */ document.createElement("canvas");
        canvas.width = window.innerWidth - 32;
        canvas.height = 9 * canvas.width / 16;
        if (canvas.height + 64 > window.innerHeight) {
            canvas.width = window.innerHeight * 16 / 9 - 64;
            canvas.height = 9 * canvas.width / 16;
        }
        coordwidth = 1000;
        coordheight = 562.5; // dynamic canvas scaling      
        document.getElementById("canvasBackDiv").appendChild(canvas);
        if (canvas.getContext) {
            /** @type {CanvasRenderingContext2D} */
            c = canvas.getContext('2d');
        }
        enemies = {};
        bullets = {};
        HUDobj = new HUD(c);
        mute = true;
        endless = function () {
            // draw background
            c.clearRect(0, 0, canvas.width, canvas.height);
            c.drawImage(resources["images/background.jpg"], 0, 0, canvas.width, canvas.height);

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

            if (Math.floor(Math.random() * 300) == 1) {
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
        campaign = function () {
            // draw background
            c.clearRect(0, 0, canvas.width, canvas.height);
            c.drawImage(resources["images/background.jpg"], 0, 0, canvas.width, canvas.height);
            for (let i = 0; i < Object.keys(bullets).length; i++) {
                bullets[Object.keys(bullets)[i]].update();
            }
            for (let i = 0; i < Object.keys(enemies).length; i++) {
                enemies[Object.keys(enemies)[i]].update();
            }
            player.update();
            if (Math.floor(Math.random() * 300) == 1) {
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
        let canvasRect = canvas.getBoundingClientRect();
        endlessb = resources["images/UI/endless.png"];
        endlessb.style.position = "absolute";
        endlessb.style.width = 222 * canvas.width / 550 + "px";
        endlessb.style.height = 39 * canvas.width / 550 + "px";
        endlessb.style.top = ((canvasRect.top + canvas.height / 2) - 39 * canvas.width / 1100) + 50 + "px";
        endlessb.style.left = ((canvasRect.left + canvas.width / 2) - 222 * canvas.width / 1100) + "px";
        document.body.appendChild(endlessb);
        campaignb = resources["images/UI/campaign.png"];
        campaignb.style.position = "absolute";
        campaignb.style.width = 222 * canvas.width / 550 + "px";
        campaignb.style.height = 39 * canvas.width / 550 + "px";
        campaignb.style.top = ((canvasRect.top + canvas.height / 2) - 39 * canvas.width / 1100) - 50 + "px";
        campaignb.style.left = ((canvasRect.left + canvas.width / 2) - 222 * canvas.width / 1100) + "px";
        document.body.appendChild(campaignb);
        muteb = resources["images/UI/muted.png"];
        muteb.style.position = "absolute";
        muteb.style.width = 24 * canvas.width / 550 + "px";
        muteb.style.height = 24 * canvas.width / 550 + "px";
        muteb.style.top = ((canvasRect.top + 999 * canvas.height / 1000) - 48 * canvas.width / 1100) + "px";
        muteb.style.left = ((canvasRect.left + canvas.width / 1000) + 12 * canvas.width / 1100) + "px";
        document.body.appendChild(muteb);

        musicEl = resources["audio/title-screen.ogg"];
        musicEl.volume = 0.25;
        endlessb.addEventListener("click", function () {
            endlessb.style.display = "none";
            campaignb.style.display = "none";
            musicEl.src = "audio/endless.wav";
            musicEl.volume = 0.5;
            HUDobj.mode = false; // endless mode
            player = new Player(coordwidth / 2, coordheight / 2, canvas, bullets, enemies);
            window.cancelAnimationFrame(intialhdl);
            endless();
        });
        campaignb.addEventListener("click", function () {
            endlessb.style.display = "none";
            campaignb.style.display = "none";
            HUDobj.mode = true; // campaign mode
            player = new Player(coordwidth / 2, coordheight / 2, canvas, bullets, enemies);
            window.cancelAnimationFrame(intialhdl);
            campaign();
        });
        muteb.addEventListener("click", function () {
            if (mute) {
                muteb.src = "images/UI/unmuted.png";
                mute = false;
            } else {
                muteb.src = "images/UI/muted.png";
                mute = true;
            }
        });
        c.clearRect(0, 0, canvas.width, canvas.height);
        img = resources["images/background.jpg"];
        c.drawImage(img, 0, 0, canvas.width, canvas.height);
        intialhdl = requestAnimationFrame(function intialscreen() {
            c.clearRect(0, 0, canvas.width, canvas.height);
            img = resources["images/background.jpg"];
            c.drawImage(img, 0, 0, canvas.width, canvas.height);
            requestAnimationFrame(intialscreen);
        });
        UIhdl = window.setInterval(function UIresize() {
            let header = document.getElementsByTagName("header")[0];
            let footer = document.getElementsByClassName("footer")[0];
            let canvasRect = canvas.getBoundingClientRect();
            muteb.style.width = 24 * canvas.width / 550 + "px";
            muteb.style.height = 24 * canvas.width / 550 + "px";
            muteb.style.top = ((canvasRect.top + 999 * canvas.height / 1000) - 48 * canvas.width / 1100) + "px";
            muteb.style.left = ((canvasRect.left + canvas.width / 1000) + 12 * canvas.width / 1100) + "px";
            if (HUDobj.mode != undefined) {
                endlessb.style.display = "none";
                campaignb.style.display = "none";
                footer.style.display = "none";
                header.style.display = "none";
            } else {
                // reposition footer and title text
                footer.style = "position: absolute; margin-left: " + (canvas.clientWidth - document.getElementsByClassName("footer")[0].clientWidth) + "px; top: " + ((canvasRect.top + 999 * canvas.height / 1000) - 40) + "px";
                footer.style.left = canvasRect.left + "px";
                header.style.left = canvasRect.left + 8 + "px";

                campaignb.style.width = 222 * canvas.width / 550 + "px";
                campaignb.style.height = 39 * canvas.width / 550 + "px";
                campaignb.style.top = ((canvasRect.top + canvas.height / 2) - (39 + 50) * canvas.width / 1100) + "px";
                campaignb.style.left = ((canvasRect.left + canvas.width / 2) - 222 * canvas.width / 1100) + "px";
                endlessb.style.width = 222 * canvas.width / 550 + "px";
                endlessb.style.height = 39 * canvas.width / 550 + "px";
                endlessb.style.top = ((canvasRect.top + canvas.height / 2) - (39 - 50) * canvas.width / 1100) + "px";
                endlessb.style.left = ((canvasRect.left + canvas.width / 2) - 222 * canvas.width / 1100) + "px";
            }
            // mute audio
            if (mute) {
                lasersound.volume = 0;
                killsound.volume = 0;
                losesound.volume = 0;
                musicEl.volume = 0;
            } else {
                musicEl.play();
                lasersound.volume = 0.25;
                killsound.volume = 0.5;
                losesound.volume = 1;
                if (musicEl.src == "audio/endless.wav") {
                    musicEl.volume = 0.25;
                } else {
                    musicEl.volume = 0.125;
                }
            }
            // resize canvas accordingly
            canvas.width = window.innerWidth - 32;
            canvas.height = 9 * canvas.width / 16;
            if (canvas.height + 64 > window.innerHeight) {
                canvas.width = window.innerHeight * 16 / 9 - 64;
                canvas.height = 9 * canvas.width / 16;
            }
        }, 100);
    } else {
        allhandl = window.requestAnimationFrame(main);
    }
}

main();