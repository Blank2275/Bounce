var app = require("express")();
var http = require("http").createServer(app);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/bounce.html");
});
app.get("/structure.js", (req, res) => {
    res.sendFile(__dirname + "/structure.js");
});
app.get("/gameobjects.js", (req, res) => {
    res.sendFile(__dirname + "/gameobjects.js");
});
app.get("/main.js", (req, res) => {
    res.sendFile(__dirname + "/main.js");
});
app.get("/input.js", (req, res) => {
    res.sendFile(__dirname + "/input.js");
});
app.get("/Astronaut.png", (req, res) => {
    res.sendFile(__dirname + "/Astronaut.png");
});
app.get("/redAsteroid.png", (req, res) => {
    res.sendFile(__dirname + "/redAsteroid.png");
});
app.get("/yellowAsteroid.png", (req, res) => {
    res.sendFile(__dirname + "/yellowAsteroid.png");
});

app.get("/sounds/crumbling.wav", (req, res) => {
    res.sendFile(__dirname + "/sounds/crumbling.wav");
});
app.get("/sounds/crumbling2.wav", (req, res) => {
    res.sendFile(__dirname + "/sounds/crumbling2.wav");
});
app.get("/sounds/crumbling3.wav", (req, res) => {
    res.sendFile(__dirname + "/sounds/crumbling3.wav");
});
app.get("/sounds/gameover.wav", (req, res) => {
    res.sendFile(__dirname + "/sounds/gameover.wav");
});
app.get("/sounds/hit.wav", (req, res) => {
    res.sendFile(__dirname + "/sounds/hit.wav");
});
app.get("/sounds/powerup.wav", (req, res) => {
    res.sendFile(__dirname + "/sounds/powerup.wav");
});


app.listen(3000, () => {
    console.log("10.0.0.108:3000");
});