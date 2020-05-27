window.onload = function () {

    // Initialise the game engine.
    let gameEngine = new Engine('viewport');


    // ********************************************************************************************
    // Create game objects here.

    let winWidth = gameEngine.getWindowWidth();
    let winHeight = gameEngine.getWindowHeight();

    var title = gameEngine.createText('Hello 2D world', FONT_SIZE._48, FONT_TYPE.COMIC_SANS_MS, FONT_WEIGHT.NORMAL, COLOUR_RGB.WHITE, { x:winWidth*0.34, y:winHeight*0.35 });
    var info = gameEngine.createText('Press the arrow keys to move me!', FONT_SIZE._36, FONT_TYPE.IMPACT, FONT_WEIGHT.NORMAL, COLOUR_RGB.SILVER, { x:winWidth*0.27, y:winHeight*0.45 });

    var circleTex = gameEngine.createTexture('assets/circle1.png');
    var enemyTex = gameEngine.createTexture('assets/enemy.png');
    //var enemyTex = gameEngine.createTexture('assets/enemy_spritesheet.png');
    var player = gameEngine.createSprite(enemyTex, { w:55, h:40 }, { x:winWidth*0.5, y:winHeight*0.65 });
    //player.setupAnimation({ w:55, h:40 }, 10);
    //player.playAnimation();
    //player.scale(2.0);

    var moveSpeed = 500;


    // v1.1 TEST
    console.log('isJoypadConnected: ' + gameEngine.isJoypadConnected());
    console.log('getHalfWidth: ' + player.getHalfWidth());
    console.log('getHalfHeight: ' + player.getHalfHeight());
    
    //player.setTexture(circleTex, { w:100, h:100 });




    // Start the game engine.
    gameEngine.start(gameLoop);
    gameEngine.showFps();

    function gameLoop(elapsedTime) {


        // ********************************************************************************************
        // Update game logic here.

        var frameTime = gameEngine.frameTime();

        if (gameEngine.keyHold(KEY.UP)) {
            player.moveY(-moveSpeed * frameTime);
        } else if (gameEngine.keyHold(KEY.DOWN)) {
            player.moveY(moveSpeed * frameTime);
        } 
        if (gameEngine.keyHold(KEY.LEFT)) {
            player.moveX(-moveSpeed * frameTime);
        } else if (gameEngine.keyHold(KEY.RIGHT)) {
            player.moveX(moveSpeed * frameTime);
        }

        if (gameEngine.keyPress(KEY.SPACE)) {
            player.setTexture(circleTex, { w:100, h:100 });
            var tex = player.getTexture();
            console.log(tex);
        }

        // Engine draw and update process.
        gameEngine.draw();
        gameEngine.update(elapsedTime);
    }
};