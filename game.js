
let gameOn = false;

document.onkeydown = checkKey;

// loop 16 tiles
function start() {
    for (let x = 1; x <= 16; x++) {
        document.getElementById("t-"+x).innerHTML = "0";
    }

    let y = Math.ceil(Math.random()*16);
    let z = Math.ceil(Math.random()*16);

    while (y === z) {
        z = Math.round(Math.random()*16);
    }

    document.getElementById("t-"+y).innerHTML = ""+Math.round(Math.random()+1)*2;
    document.getElementById("t-"+z).innerHTML = ""+Math.round(Math.random()+1)*2;

    updateColors();

    document.getElementById("scoreUI").innerHTML = "0";
    // document.getElementById("highscoreUI").innerHTML = "0";

    if (localStorage.getItem("highscore") !== null) {
        document.getElementById("highscoreUI").innerHTML = localStorage.getItem("highscore");
    } else {
        localStorage.setItem("highscore", "0")
    }



    gameOn = true;
    document.getElementById("gameover").style.display = "none";
}

function updateColors() {
    for (let x = 1; x <= 16; x++) {
        
        if (document.getElementById("t-"+x).innerHTML == "0") {
            let y = 0;

        } else {
            let y = parseInt(Math.log2(parseInt(document.getElementById("t-"+x).innerHTML)));
        }

        let z = y/11;

        if (z<1 && z>0) {
            document.getElementById("t-" + x).parentElement.style.backgroundColor = "hs1("+(z*360)+", "+((z*60)+40)+"%, "+((z*60)+40)+"%)";
        } else if (z === 1) {
            document.getElementById("t-" + x).parentElement.style.backgroundColor = "#00ff00";
        } else if (z === 0) {
            document.getElementById("t-" + x).parentElement.style.backgroundColor = "#666";
        } else {
            document.getElementById("t-" + x).parentElement.style.backgroundColor = "#420";
        }

    }
}



function newTile() {
    if (gameCheck() == false) {
        gameOver(); 
        return false; 
    }

    let res = [];
    for (let x = 1; x < 16; x++) {
        if (document.getElementById("t-"+x).innerHTML == "0") {
            res.push(x);
        }
    }

    // let y = Math.round(Math.random()+1)*2;

    if (res.length == 0) {
        //game over
        if (gameCheck() == false) { gameOver(); }
    } else {
        document.getElementById("t-" + res[Math.floor(Math.random() * res.length)]).innerHTML = Math.round(Math.random() + 1) * 2;
    }

    updateColors();
}

function left() {
    let a = row(1, 2, 3, 4);
    let b = row(5, 6, 7, 8);
    let c = row(9, 10, 11, 12);
    let d = row(13, 14, 15, 16);
    if (a || b || c || d) { newTile(); }
    if (gameCheck() == false) { gameOver(); }
}
function right() {
    let a = row(4, 3, 2, 1);
    let b = row(8, 7, 6, 5);
    let c = row(12, 11, 10, 9);
    let d = row(16, 15, 14, 13);
    if (a || b || c || d) { newTile(); }
    if (gameCheck() == false) { gameOver(); }
}
function up() {
    let a = row(1, 5, 9, 13);
    let b = row(2, 6, 10, 14);
    let c = row(3, 7, 11, 15);
    let d = row(4, 8, 12, 16);
    if (a || b || c || d) { newTile(); }
    if (gameCheck() == false) { gameOver(); }
}
function down() {
    let a = row(13, 9, 5, 1);
    let b = row(14, 10, 6, 2);
    let c = row(15, 11, 7, 3);
    let d = row(16, 12, 8, 4);
    if (a||b||c||d) { newTile(); }
    if (gameCheck() == false) { gameOver(); }
}

function row(aa, bb, cc, dd) {
    
    let inputs = [aa, bb, cc, dd];

    let a = parseInt(document.getElementById("t-"+aa).innerHTML);
    let b = parseInt(document.getElementById("t-"+bb).innerHTML);
    let c = parseInt(document.getElementById("t-"+cc).innerHTML);
    let d = parseInt(document.getElementById("t-"+dd).innerHTML);

    let vals = [];
    let res = [];

    if (a != 0) { vals.push(a); }
    if (b != 0) { vals.push(b); }
    if (c != 0) { vals.push(c); }
    if (d != 0) { vals.push(d); }

    for (let x = 0; x < vals.length; x++) {
        // console.log(vals[x]);
        if (typeof vals[x+1] !== 'undefined') { // if this exists
            if (vals[x] == vals[x+1]) { // merge tiles if equals

                res.push(vals[x] + vals[x+1]);
                let newScore = parseInt(document.getElementById("scoreUI").innerHTML) + (vals[x] + vals[x + 1]);
                document.getElementById("scoreUI").innerHTML = newScore;
                
                if (newScore > parseInt(document.getElementById("highscoreUI").innerHTML)) {
                    localStorage.setItem("highscore", newScore);
                    document.getElementById("highscoreUI").innerHTML = newScore;
                }
                
                x += 1;
            } else {
                res.push(vals[x]);
            }
        } else { // single tile
            res.push(vals[x]);
        }
    }

    let z = 0;
    let input = [a, b, c, d];
    let output = [];

    while (z < res.length) {
        document.getElementById("t-"+(inputs[z])).innerHTML = ""+res[z];
        output.push(res[z]);
        z += 1;
    }

    while (z < 4) {
        document.getElementById("t-"+(inputs[z])).innerHTML = "0";
        output.push(0);
        z += 1;
    }

    if ("" + input[0] + ", " + input[1] + ", " + input[2] + ", " + input[3] + "" == "" + output[0] + ", " + output[1] + ", " + output[2] + ", " + output[3]) {
        return false;
    } else {
        return true;
    }

    // console.log("" + input[0] + ", " + input[1] + ", " + input[2] + ", " + input[3] + " + " + output[0] + ", " + output[1] + ", " + output[2] + ", " + output[3]);

}


function gameCheck() {
    if (rowCheck(1, 2, 3, 4)) {return true; }
    if (rowCheck(5, 6, 7, 8)) { return true; }
    if (rowCheck(9, 10, 11, 12)) { return true; }
    if (rowCheck(13, 14, 15, 16)) { return true; }

    if (rowCheck(4, 3, 2, 1)  ){ return true; }
    if (rowCheck(8, 7, 6, 5)) { return true; }
    if (rowCheck(12, 11, 10, 9)) { return true; }
    if (rowCheck(16, 15, 14, 13)) { return true; }

    if (rowCheck(1, 5, 9, 13) ){ return true; }
    if (rowCheck(2, 6, 10, 14)) { return true; }
    if (rowCheck(3, 7, 11, 15)) { return true; }
    if (rowCheck(4, 8, 12, 16)) { return true; }

    if (rowCheck(13, 9, 5, 1) ){ return true; }
    if (rowCheck(14, 10, 6, 2)) { return true; }
    if (rowCheck(15, 11, 7, 3)) { return true; }
    if (rowCheck(16, 12, 8, 4)) { return true; }

    return false;
}

function rowCheck(aa, bb, cc, dd) {
    let inputs = [aa, bb, cc, dd];

    let a = parseInt(document.getElementById("t-" + aa).innerHTML);
    let b = parseInt(document.getElementById("t-" + bb).innerHTML);
    let c = parseInt(document.getElementById("t-" + cc).innerHTML);
    let d = parseInt(document.getElementById("t-" + dd).innerHTML);

    let vals = [];
    let res = [];

    if (a != 0) { vals.push(a); } else { return true; }
    if (b != 0) { vals.push(b); } else { return true; }
    if (c != 0) { vals.push(c); } else { return true; }
    if (d != 0) { vals.push(d); } else { return true; }

    for (let x = 0; x < vals.length; x++) {
        // console.log(vals[x]);
        if (typeof vals[x + 1] !== 'undefined') { // if this exists
            if (vals[x] == vals[x + 1]) { // merge tiles if equals
                return true;
            }
        } 
    }
    return false;
}

function gameOver() {
    gameOn = false;
    document.getElementById("gameover").style.display = "block";
}

function checkKey(e) {
    e = e || window.event;
    console.log(e.keyCode);

    if (e.keyCode == '38') {
        // up
        document.getElementById("controlsUI").innerHTML = "UP";
        up();
    } else if (e.keyCode == '40') {
        // down
        document.getElementById("controlsUI").innerHTML = "DOWN";
        down();
    } else if (e.keyCode == '37') {
        // left
        document.getElementById("controlsUI").innerHTML = "LEFT";
        left();
    } else if (e.keyCode == '39') {
        // right
        document.getElementById("controlsUI").innerHTML = "RIGHT";
        right();
    } else if (e.keyCode == '82') {
        // restart
        document.getElementById("controlsUI").innerHTML = "R";
        start();
    } else if (e.keyCode == '78') {
        // restart
        document.getElementById("controlsUI").innerHTML = "N";
        newTile();
    } else if (e.keyCode == '71') {
        // restart
        document.getElementById("controlsUI").innerHTML = "G";
        gameOver();
    }
}