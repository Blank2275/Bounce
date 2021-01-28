<!DOCTYPE html>
<html>
    <head>
        <title>Bounce</title>
        <script src = "gameobjects.js"></script>
        <script src = "input.js"></script>
        <script src = "structure.js"></script>
        <script src = "main.js"></script>
    </head>
    <body onkeydown = "keyDown(event)" onkeyup="keyUp(event);" onresize = "resize()">
        <style>
            html, body{
                height:100%;
                overflow:hidden;
            }
            #main{
                width:96%;
                background-color:rgb(0, 10, 20);
            }
            #ui{
                position:absolute;
                left:55%;
                width:30%;
                height:7%;
                float:left;
                background-color:rgba(150, 150, 150, 0.7);
            }
            #difficulty-select{
                position:absolute;
                left:40%;
                width:59%;
                height:80%;
                top:10%;
                background-color:rgba(0, 0, 0, 0.2);
            }
            .dsb{
                position:relative;
                float:left;
                text-align:center;
                width:23%;
                height:80%;
                top:10%;
                display:inherit;
                pointer-events:inherit;
            }
            .gs{
                position:relative;
                float:left;
                text-align:center;
                width:20%;
                height:80%;
                top:10%;
                display:inherit;
                pointer-events:inherit;
            }
            #restart{
                position:absolute;
                width: 30%;
                height:15%;
                left: 35%;
                top: 52.5%;
                background-color:green;
                font-size:500%;
                float:left;
            }
            #difficulty-display{
                position:relative;
                color:white;
                top:10%;
                left:-40%;
                float:left;
            }
            #gamemode-display{
                position:relative;
                color:white;
                top:10%;
                left:-30%;
            }
            #countdown{
                position:absolute;
                left:85%;
                top:0%;
                font-size:200%;
                color:white;
                display:none;
            }
        </style>
        <div id = "ui">
            <button id = "home" onclick = "goHome()">Home</button>
            <div id = "gamemode-select">
                <button id = "classic" class = "gs" onclick = "setGamemode('Classic')">Classic</button>
                <button id = "survival" class = "gs" onclick = "setGamemode('Survival')">Survival</button>
            </div>
            <div id = "difficulty-select">
                <button id = "easy" class = "dsb" onclick = "setDifficulty('Easy')">Easy</button>
                <button id = "normal" class = "dsb" onclick = "setDifficulty('Normal')">Normal</button>
                <button id = "hard" class = "dsb" onclick = "setDifficulty('Hard')">Hard</button>
            </div>
            <p id = "difficulty-display">Normal</p>
            <p id = "gamemode-display">Classic</p>
        </div>
        <button id = "restart" onclick = "restart()">Start</button>
        <p id = "countdown">60</p>
        <canvas id = "main" onclick = "">
        
        </canvas>
        <p>
            <!--
            WASD to move, space to destroy asteroids (red and yellow circles). red asteroids give 10 points when destroyed and shatter into smaller asteroids
            golden (yellow) asteroids give 30 points and do not shatter. your shield power is the bar in the upper left which will go down when you hit space
            and up when you don't, your score is also in the upper left. The green circles with a blue outline are unlimited shield power powerups. green 
            circles with red outlines are an extra life which will appear in the lower left. The unlimited power bar is in the lower left
            -->
        </p>
    </body>
</html> 
