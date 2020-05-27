window.onload = function () {

    // Initialise the game engine.
    let gameEngine = new Engine('viewport');

    let minPosX= 20;
    let minPosY= 20;
    let maxPosX = gameEngine.getWindowWidth() - 20;
    let maxPosY = gameEngine.getWindowHeight() - 20;
    let totalSprites = 200;

    var spriteObjects = [];
    var enemyTex = new Texture('assets/enemy_spritesheet.png');
    var scales = [0.5, 1.0, 1.5];
    for (var i = 0, len = totalSprites; i < len; i++) {
         var mySprite = gameEngine.createSprite(enemyTex, { w: 55, h: 40 }, { x:gameEngine.randomNumber(minPosX, maxPosX), y:gameEngine.randomNumber(minPosY, maxPosY) }, false);
         mySprite.setupAnimation({ w: 55, h: 40 }, 10, 0.1, false);
         mySprite.setAnimationFramePosX(gameEngine.randomNumber(0, 9));
         mySprite.scale(scales[gameEngine.randomNumber(0, 3)]);
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