const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

let targets = [];
let score = 0;

function createTarget() {
    const target = {
        x: Math.random() * (canvas.width - 30),
        y: Math.random() * (canvas.height - 30),
        size: 30,
        isHit: false
    };
    targets.push(target);
}

function drawTargets() {
    targets.forEach(target => {
        if (!target.isHit) {
            ctx.fillStyle = "red";
            ctx.fillRect(target.x, target.y, target.size, target.size);
        }
    });
}

function updateScore() {
    document.getElementById("score").innerText = "Score: " + score;
}

canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    targets.forEach(target => {
        if (
            !target.isHit && 
            mouseX >= target.x &&
            mouseX <= target.x + target.size &&
            mouseY >= target.y &&
            mouseY <= target.y + target.size
        ) {
            target.isHit = true; 
            score++; 
            updateScore(); 
        }
    });
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTargets();
    requestAnimationFrame(gameLoop);
}

setInterval(createTarget, 1000); 
gameLoop();
