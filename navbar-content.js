function set(xhttp, hdl) {
    xhttp.onreadystatechange = hdl;
}

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    var func = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                elmnt.innerHTML = this.responseText;
            }
            if (this.status == 404) {
                elmnt.innerHTML = "Page not found.";
            }
            /*remove the attribute, and call this function once more:*/
            elmnt.removeAttribute("include-html");
            includeHTML();
        }
    };
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("include-html");
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            set(xhttp, func);
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            return;
        }
    }
}

var theme = false;

function checkTheme() {
    if (theme) {
        try {
            document.querySelector("#theme-toggle-text").innerHTML = "Dark Theme";
            document.getElementsByTagName("input")[0].checked = theme;
        } catch (TypeError) {}
        document.querySelector(":root").style = `
        /* dark */
        --start-gradient-color: rgb(151, 42, 184);
        --end-gradient-color: rgb(226, 40, 81);

        --shade1: rgb(113, 30, 138);
        --shade2: rgb(151, 42, 184);
        --shade3: rgb(201, 56, 245);
        --shade4: rgb(128, 23, 45);
        --shade5: rgb(170, 30, 60);
        --shade6: rgb(226, 40, 81);

        --image-invert-percent: 100%;
        --background: rgb(12, 14, 20);
        --foreground: white;
        --separator-color: rgb(24, 28, 40);
        --nav-bar-color: rgb(24, 28, 40);
        --shadow-color: rgba(0, 0, 0, 0.2);
        `;
    } else {
        try {
            document.querySelector("#theme-toggle-text").innerHTML = "Light Theme";
            document.getElementsByTagName("input")[0].checked = theme;
        } catch (TypeError) {}
        document.querySelector(":root").style = `
        /* light */
        --start-gradient-color: rgb(196, 58, 238);
        --end-gradient-color: rgb(255, 46, 92);

        --shade1: rgb(154, 39, 189);
        --shade2: rgb(183, 53, 223);
        --shade3: rgb(209, 58, 255);
        --shade4: rgb(194, 35, 70);
        --shade5: rgb(211, 38, 76);
        --shade6: rgb(255, 51, 95);

        --image-invert-percent: 0%;
        --background: white;
        --foreground: rgb(12, 14, 20);
        --separator-color: rgb(231, 227, 215);
        --nav-bar-color: rgb(231, 227, 215);
        --shadow-color: rgba(0, 0, 0, 0.2);
        `;
    }
    for (let i = 0; i < document.querySelectorAll("a").length; i++) {
        if (document.querySelectorAll("a")[i].href[document.querySelectorAll("a")[i].href.length - 1] != "e") {
            document.querySelectorAll("a")[i].href = document.querySelectorAll("a")[i].href + "?theme=" + theme;
        } else {
            document.querySelectorAll("a")[i].href = document.querySelectorAll("a")[i].href.split("?")[0] + "?theme=" + theme;
        }
    }
    requestAnimationFrame(checkTheme);
}

var parameters = location.search.substring(1).split("&");
var temp = parameters[0].split("=");

if (temp[0] == "theme") {
    if (temp[1] == "light" || temp[1] == "false") {
        theme = false;
    } else if (temp[1] == "dark" || temp[1] == "true") {
        theme = true;
    }
}

includeHTML();
checkTheme();