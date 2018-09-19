function drawBackground(ctx, width, height) {
    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.rect(0, 0, width, height);
    ctx.fill();

    ctx.fillStyle = "green";
    ctx.fillRect(0, height - 100 , width, 100);
}

function drawSun(ctx, radius, centrX, centrY) {
    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.arc(centrX, centrY, radius, -Math.PI/4, Math.PI*3/2);
    ctx.fill();
}

function drawCloud(ctx, beginX, beginY, width, height) {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.ellipse(beginX, beginY, width, height, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(beginX - 40, beginY + 20, width, height, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(beginX + 40, beginY + 20, width, height, 0, 0, Math.PI*2);
    ctx.fill();
}

function drawHouse(ctx, centrX, centrY , houseWidht, houseHight, windowSize) {
    ctx.beginPath();
    ctx.fillStyle = "brown";
    ctx.rect(centrX - houseWidht/2, centrY, houseWidht, houseHight);
    ctx.fill();
    

    ctx.beginPath();
    ctx.fillStyle = "grey";
    ctx.rect(centrX + houseWidht/4, centrY - houseHight/2.5, houseWidht/8, houseHight/3);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.moveTo(centrX - houseWidht/2, centrY);
    ctx.lineTo(centrX + houseWidht/2, centrY);
    ctx.lineTo(centrX, houseHight/1.5);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.rect(centrX - windowSize/2, centrY + (houseHight - windowSize*1.2)/2, windowSize, windowSize*1.2);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "grey";
    ctx.moveTo(centrX,  centrY + (houseHight - windowSize*1.2)/2);
    ctx.lineTo(centrX,  centrY + (houseHight + windowSize*1.2)/2);
    ctx.stroke();

    ctx.moveTo(centrX - windowSize/2,  centrY + houseHight/2);
    ctx.lineTo(centrX + windowSize/2,  centrY + houseHight/2);
    ctx.stroke();

}

function draw() {
    const canvas = document.getElementById('canvas');
    const width = 1000;
    const height = 500;
    canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
    
    const ctx = canvas.getContext('2d');
    
    drawBackground(ctx, width, height);
    drawCloud(ctx, 240, 70, 70, 30);
    drawCloud(ctx, 500, 40, 50, 30);
    drawCloud(ctx, 800, 70, 60, 30);

    drawSun(ctx, 50, 20, 30);

    drawHouse(ctx, width/2, height/2, 260, 240, 100);
    
}

window.onload = function() {
    draw();

};