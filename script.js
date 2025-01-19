const canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");

// 游戏设置
const gridSize = 20; // 每个格子的大小
const tileCount = canvas.width / gridSize; // 每行/列的格子数

// 蛇的初始状态
let snake = [{ x: 10, y: 10 }]; // 蛇的初始位置
let direction = { x: 0, y: 0 }; // 蛇的移动方向
let food = { x: 5, y: 5 }; // 食物的初始位置
let score = 0;

// 音效
const eatSound = new Audio("data:audio/mp3;base64,SUQzBAAAAAABAFRYWFgAAAASAAADbWFqb3JfYnJhbmQAZGFzaABUWFhYAAAAEQAAA21pbm9yX3ZlcnNpb24AMABUWFhYAAAAHAAAA2NvbXBhdGlibGVfYnJhbmRzAGlzbzZtcDQxAFRTU0UAAAAPAAADTGF2ZjYwLjE2LjEwMAAAAAAAAAAAAAAA//uwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAB4AAEoUgAGCAoMEBMVFxkdHyEjJiosLjAyNzk7PT9DRUdKTFBSVFZYXV9hY2Vpa25wcnZ4enx+g4WHiYuPkZSWmJyeoKKlqautr7G1uLq8vsLExsjLz9HT1dfc3uDi5Ojq7O/x9ff5+/0AAAAATGF2YzYwLjMxAAAAAAAAAAAAAAAAJAXAAAAAAAABKFLZDdaXAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD");

// 监听键盘事件
document.addEventListener("keydown", event => {
    switch (event.key) {
        case "ArrowUp":
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

// 监听触控按钮点击事件
document.getElementById("up").addEventListener("click", () => {
    if (direction.y === 0) direction = { x: 0, y: -1 };
});
document.getElementById("down").addEventListener("click", () => {
    if (direction.y === 0) direction = { x: 0, y: 1 };
});
document.getElementById("left").addEventListener("click", () => {
    if (direction.x === 0) direction = { x: -1, y: 0 };
});
document.getElementById("right").addEventListener("click", () => {
    if (direction.x === 0) direction = { x: 1, y: 0 };
});

// 触摸滑动控制
let startX, startY;
canvas.addEventListener("touchstart", event => {
    const touch = event.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
});

canvas.addEventListener("touchend", event => {
    const touch = event.changedTouches[0];
    const endX = touch.clientX;
    const endY = touch.clientY;

    const diffX = endX - startX;
    const diffY = endY - startY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0 && direction.x === 0) direction = { x: 1, y: 0 }; // 向右
        else if (diffX < 0 && direction.x === 0) direction = { x: -1, y: 0 }; // 向左
    } else {
        if (diffY > 0 && direction.y === 0) direction = { x: 0, y: 1 }; // 向下
        else if (diffY < 0 && direction.y === 0) direction = { x: 0, y: -1 }; // 向上
    }
});

// 游戏主循环（简化）
function gameLoop() {
    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制蛇和食物
    snake.forEach(segment => {
        ctx.fillStyle = "green";
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });

    ctx.fillStyle = "red";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

    // 更新蛇状态
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    // 检测食物
    if (head.x === food.x && head.y === food.y) {
        eatSound.play();
        food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
    } else {
        snake.pop();
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();
