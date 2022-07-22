const express = require('express');
const app = express();
var fs = require('fs');
const host = '192.168.1.20';
const port = 8080;
var cors = require('cors');
app.use(cors({ origin: 'http://web.sfc.keio.ac.jp/~t18521to/HideSeek/Client.html'}));
app.use(cors({ origin: true, credentials : true}));
app.use(express.urlencoded({extended:true}));
app.use(express.json());


function User(ID, lat, long, isSeeker, numHints){
    this.ID = ID;
    this.lat = lat;
    this.long = long;
    this.isSeeker = isSeeker;
    this.numHints = numHints;
}

app.get('/register', (req, res) => {
    users.push(new User(Date.now(), 0, 0, false, numHints));
    res.send(String(users[numPlayers].ID));
    console.log(users[numPlayers].ID);
    numPlayers += 1;
    if (numPlayers == minPlayers){
        startGame = true;
    }
})

app.get('/', (req, res) => {
    res.send("Hello from server!");
    console.log("server accessed");
})

app.get('/test', (req, res) => {
    fs.readFile('./test/hello.txt', function(err, data) {
        res.send(data);
    });
})

//register or update user location
app.post('/coords', (req, res) => {
    //console.log(req.body.lat);
    users.forEach((user) => {
        if(user.ID == req.body.userID){
            //TODO exception handling
            user.lat = req.body.lat;
            user.long = req.body.long;
            console.log(user);
        }
    })
})

app.get('/start', (req, res) => {
    if(startGame){
        res.send("Game started");
        game();
    } else {
        res.send("Insufficient number of players");
    }
})

app.post('/hint', (req, res) => {
    users.forEach((user, i) => {
        if(user.ID == req.body.userID){
            if(user.isSeeker){
                seekerHint(i);
            } else {
                hiderHint(i);
            }
        }
    })
})

app.listen(port, host, () =>{
    console.log(`Server is running on http://${host}:${port}`);
})

let minPlayers, numPlayers, numHints, hintRadius;
let startGame;
const users = [];

function initialize(){
    minPlayers = 3;
    numPlayers = 0;
    numHints = 3;
    //amount of random variance to add to player coords for hints
    hintRadius = 0.0005; //0.0001 = 11.1m precision

    startGame = false;
    console.log("initialized");
}

function seekerHint(userIndex){
    //give hint to seeker about coords of a hider
}

function hiderHint(userIndex){
    //give hint to hider about coords of seeker
    //offset by hintRadius
}

/*
function identify(id){
    users.forEach((user, i) => {
        if(user.ID == id){
            return i;
        } else {
            console.log("player not registered");
        }
        return;
    })
}
*/

function game(){

}


//main
initialize();

//