window.onload = function () {

    // Initialise the game engine.
    let gameEngine = new Engine('viewport');

    let minPosX= 20;
    let minPosY= 20;
    let maxPosX = gameEngine.getWindowWidth() - 20;
    let maxPosY = gameEngine.getWindowHeight() - 20;
    let totalTexts= 1000;

    var textObjects = [];
    var sizes = [FONT_SIZE._16, FONT_SIZE._26, FONT_SIZE._36];
    for (var i = 0, len = totalTexts; i < len; i++) {
        var myText = gameEngine.createText(String.fromCharCode(gameEngine.randomNumber(65, 90)), sizes[gameEngine.randomNumber(0, 2)], FONT_TYPE.ARIAL, FONT_WEIGHT.BOLD, 
                                                               COLOUR_RGB.LIME, { x:gameEngine.randomNumber(minPosX, maxPosX), y:gameEngine.randomNumber(minPosX, maxPosY) });
        myText.setAlpha(gameEngine.randomNumberDecimal(0, 1));
        textObjects.push(myText);
    }

    var time = 0.0;

    // Start the game engine.
    gameEngine.start(gameLoop);
    gameEngine.showFps();

    function gameLoop(elapsedTime) {

        var frameTime = gameEngine.frameTime();

        time += frameTime;
        if (time > 0.333) {
            time = 0.0;
            for (var i = 0, len = totalTexts; i < len; i++) {
                textObjects[i].setX(gameEngine.randomNumber(minPosX, maxPosX));
                textObjects[i].setY(gameEngine.randomNumber(minPosY, maxPosY));
            }
        }

        // Engine draw and update process.
        gameEngine.draw();
        gameEngine.update(elapsedTime);
    }
};