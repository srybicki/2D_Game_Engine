window.onload = function () {

    // Initialise the game engine.
    let gameEngine = new Engine('viewport');

    let minPosX= 20;
    let minPosY= 20;
    let maxPosX = gameEngine.getWindowWidth() - 20;
    let maxPosY = gameEngine.getWindowHeight() - 20;
    let totalTexts = 1000;
    let totalSprites = 500;

    var textObjects = [];
    var sizes = [FONT_SIZE._16, FONT_SIZE._26, FONT_SIZE._36];
    for (var i = 0, len = totalTexts; i < len; i++) {
        var myText = gameEngine.createText(String.fromCharCode(gameEngine.randomNumber(65, 90)), sizes[gameEngine.randomNumber(0, 2)], FONT_TYPE.ARIAL, FONT_WEIGHT.BOLD, 
                                                               COLOUR_RGB.WHITE, { x:gameEngine.randomNumber(minPosX, maxPosX), y:gameEngine.randomNumber(minPosX, maxPosY) });
        myText.setAlpha(gameEngine.randomNumberDecimal(0, 1));
        textObjects.push(myText);
    }

    var spriteObjects = [];
    var enemyTex = new Texture('assets/enemy_spritesheet.png');
    var scales = [0.5, 1.0, 1.5];
    for (var i = 0, len = totalSprites; i < len; i++) {
         var mySprite = gameEngine.createSprite(enemyTex, { w: 55, h: 40 }, { x:gameEngine.randomNumber(minPosX, maxPosX), y:gameEngine.randomNumber(minPosY, maxPosY) }, false);
         mySprite.setupAnimation({ w: 55, h: 40 }, 10, 0.1, false);
         mySprite.setAnimationFramePosX(gameEngine.randomNumber(0, 9));
         mySprite.scale(scales[gameEngine.randomNumber(0, 2)]);
         spriteObjects.push(mySprite);
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
            for (var i = 0, len = totalSprites; i < len; i++) {
                spriteObjects[i].setX(gameEngine.randomNumber(minPosX, maxPosX));
                spriteObjects[i].setY(gameEngine.randomNumber(minPosY, maxPosY));
            }
        }

        // Engine draw and update process.
        gameEngine.draw();
        gameEngine.update(elapsedTime);
    }
};