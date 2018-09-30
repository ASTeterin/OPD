

//const CLOUD_POSITION = [150, 500, 850];
const SKY_COLOR = 240;
const HORIZONT = 0.8;
const SUN_SPEED = 0.1;
const CLOUD_SIZE = 60;

function Cloud({
    startX,
    startY,
    speed,
    trajectory
}) {
    this.x = startX;
    this.y = startY;
    this.s = speed;
    this.t = trajectory
}

function Sky({color}) {
    this.color = color;
}

function Sun({
    startX,
    startY,
    radius,
    angle    
}) {
    this.x = startX;
    this.y = startY;
    this.r = radius;
    this.angle = angle;
}

function HslColor({
    hue,
    saturation,
    lightness,
}) {
    this.h = hue;
    this.s = saturation;
    this.l = lightness;

    this.toFillStyle = function () {
        const h = SKY_COLOR;
        const s = this.s * 100;
        const l = this.l;
        return "hsl(" + h + "," + s + "%," + l + "%)";
    }
}



function drawSun({ctx, sun}) {
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, sun.r, 0, Math.PI * 2);
    ctx.fill();
}

function moveSun({dT, sun, boxWidth, boxHeight}) {
    const deltaAngle = dT * SUN_SPEED;
    sun.angle = (sun.angle + deltaAngle) % (2 * Math.PI);
    sun.x = 380 * Math.sin(-sun.angle) + boxWidth / 2;
    sun.y = 400 * Math.cos(sun.angle) + boxHeight * HORIZONT; 
}

function drawCloud({ctx, cloud, rX, rY}) {
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.ellipse(cloud.x, cloud.y, rX, rY , 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cloud.x + rX / 2, cloud.y + rY / 2, rX, rY , 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cloud.x - rX / 2, cloud.y + rY / 2, rX, rY, 0, 0, Math.PI * 2);
    ctx.fill();
}

function drawGrass(ctx, width, height) {
    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.rect(0, height / 1.5, width, height);
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

function redraw({ctx, width, height, clouds, sun, sky}) {
    drawSky({ctx, sky, width, height}); 
    drawSun({ctx, sun});
    drawGrass(ctx, width, height);
    drawHouse(ctx, width/2, height/2, 260, 240, 100);
    for (const cloud of clouds) { 
        drawCloud({ctx, cloud, rX: 60, rY: 40});
    }
}

function moveCloud({distance, cloud, boxWidth, boxHeight}) {
    cloud.x -= distance;
    cloud.y += 0.5 * Math.sin(cloud.t * cloud.x / boxWidth);
    if (cloud.x + CLOUD_SIZE * 1.5 < 0) {
        cloud.x = boxWidth + CLOUD_SIZE * 1.5;
        cloud.y = boxHeight / 9;
    }
}

function createClouds({boxWidth, boxHeight, speed, trajectory}) {
    const startX = boxWidth;
    const startY = boxHeight;
    return new Cloud({
        startX,
        startY,     
        speed,
        trajectory
    });
}

function moveClouds({clouds, dT, boxWidth, boxHeight}) {
    for (const cloud of clouds) {
        distance = cloud.s * dT;
        moveCloud({
            distance,
            cloud,
            boxWidth,
            boxHeight
        });   
    } 
}

function update({clouds, sun, sky, boxWidth: width, boxHeight: height, dT, deltaAngle, day, dLightness}) {
    moveClouds({dT, clouds, boxWidth: width, boxHeight: height}); 
    moveSun({dT, sun,  boxWidth: width, boxHeight: height});
    updateSky({sky, angle: sun.angle});
}

function updateSky({sky, angle}) {
    const lightness = (Math.sin(angle - Math.PI/2) + 1) * 50 - 10;
    sky.color.l = lightness
}

function drawSky({ctx, sky, width, height}) {
    ctx.fillStyle = sky.color.toFillStyle();
    ctx.fillRect(0, 0, width, height);
}

function main() {
    const canvasEl = document.getElementById("canvas");

    const width = canvasEl.offsetWidth;
    const height = canvasEl.offsetHeight;
    const ctx = canvas.getContext('2d');

    const RADIUS = 30;
    const CLOUD_COUNT = 3;
    const CLOUD_SPEED = 100; 
    let clouds = [];

    for (let i = 0; i < CLOUD_COUNT; i++) {
        clouds.push(createClouds({
            boxWidth: Math.random() * width,
            boxHeight: Math.random() * 50 + 40,
            speed: Math.random() * CLOUD_SPEED + 100,
            trajectory: Math.random() * 20
        }));
    }

    let sun = new Sun({startX: width / 4, startY: height / HORIZONT, radius: RADIUS, angle: 0.5 * Math.PI});
    let hsl = new HslColor({hue: SKY_COLOR, saturation: 0.5, lightness: 50});
    let sky = new Sky({color: hsl});
   
    redraw({ctx, width, height, clouds, sun, sky});
    
    cloud = clouds[1];

    let lastTimestamp = Date.now(); //текущее время в ms
    const animateFn = () => {
        const currentTimeStamp = Date.now();
        const deltaTime = (currentTimeStamp - lastTimestamp) * 0.001; //сколько секунд прошло с прошлого кадра
        lastTimestamp = currentTimeStamp;
        update({clouds, sun, sky, boxWidth: width, boxHeight: height, dT: deltaTime});
        redraw({ctx, width, height, clouds, sun, sky});
        requestAnimationFrame(animateFn);
    }
    animateFn();
}