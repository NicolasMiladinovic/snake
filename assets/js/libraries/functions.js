let canvas, gameContainer, scoreContainer, ctx;
/* CANVAS PROPERTIES */
const canvasSize = 400;
const canvasBorder = "3px solid red";
const canvasBackgroundColor = "#1D1D1D";
const canvasOpacity = "0.8";
/* SCORE PROPERTIES */
let score = 0;
const scoreColor = "#FFF";
/* SNAKE PROPERTIES */
const snakeColor = "orange";
const snakeSize = 20;
const blockUnit = canvasSize / snakeSize;
let snakeX = Math.trunc(Math.random() * blockUnit) * snakeSize;
let snakeY = Math.trunc(Math.random() * blockUnit) * snakeSize;
/* FOOD PROPERTIES */
let foodRadius = snakeSize / 2;
let foodX = Math.trunc(Math.random() * blockUnit) * snakeSize + foodRadius;
let foodY = Math.trunc(Math.random() * blockUnit) * snakeSize + foodRadius;
/* STEP PROPERTIES */
let stepX = 0;
let stepY = 0;

export const SnakeGame = {
    start: () => {
        SnakeGame.createCanvas();
        SnakeGame.createSnake();
        SnakeGame.initMoveSnake();
        setInterval(SnakeGame.updateSnakePosition, 100);
    },
    createCanvas: () => {
        gameContainer = document.createElement("div");
        gameContainer.id = "game-container";
        gameContainer.style.display = "flex";
        gameContainer.style.flexDirection = "column";
        gameContainer.style.justifyContent = "center";
        gameContainer.style.alignItems = "center";

        scoreContainer = document.createElement("div");
        scoreContainer.id = "score";
        scoreContainer.innerHTML = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(score);
        scoreContainer.style.color = scoreColor;
        scoreContainer.style.fontSize = "30px";
        scoreContainer.style.zIndex = 2;
        scoreContainer.style.position = "fixed";

        canvas = document.createElement("canvas");
        canvas.id = "canvas";
        canvas.width = canvasSize;
        canvas.height = canvasSize;
        canvas.style.border = canvasBorder;
        canvas.style.backgroundColor = canvasBackgroundColor;
        canvas.style.opacity = canvasOpacity;

        ctx = canvas.getContext("2d");
        gameContainer.appendChild(scoreContainer);
        gameContainer.appendChild(canvas);
        document.body.appendChild(gameContainer);
    },
    createSnake: () => {
        ctx.fillStyle = snakeColor;
        ctx.clearRect(0, 0, canvasSize, canvasSize);
        ctx.fillRect(snakeX, snakeY, snakeSize, snakeSize);
        SnakeGame.createFood()
    },
    createFood: () => {
        ctx.beginPath();
        ctx.arc(foodX, foodY, foodRadius, 0, 2 * Math.PI);
        ctx.fillStyle = snakeColor;
        ctx.fill();
        ctx.closePath();
    },
    updateSnakePosition: () => {
        snakeX += stepX * snakeSize;
        snakeY += stepY * snakeSize;
        SnakeGame.createSnake();
    },
    initMoveSnake: () => {
        document.addEventListener("keydown", (event) => {
            switch (event.key) {
                case "ArrowUp":
                    stepY = -1;
                    stepX = 0;
                    break;
                case "ArrowDown":
                    stepY = 1;
                    stepX = 0;
                    break;
                case "ArrowLeft":
                    stepY = 0;
                    stepX = -1;
                    break;
                case "ArrowRight":
                    stepY = 0;
                    stepX = 1;
                    break;
                case "p":
                case "P":
                case " ":
                    stepY = 0;
                    stepX = 0;
                    break;
                default:
                    break;
            }

        })
    },
}