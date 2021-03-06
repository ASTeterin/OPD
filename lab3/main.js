const RADIUS = 30;
const CLOUD_COUNT = 3;
const CLOUD_SPEED = 100; 
const SKY_COLOR = 240;
const HORIZONT = 0.8;
const SUN_SPEED = 0.1;
const CLOUD_SIZE = 60;
const ORBIT_RADIUS = 360;
const WINDOW_WIDHT = 100;
const WINDOW_HEIGHT = 120;
const CLOUD_RADIUS_X = 60;
const CLOUD_RADIUS_Y = 40;
const HOUSE_WIDHT = 220;
const HOUSE_HEIGHT = 240;
const MIN_CLOUDS_LEVEL = 30;
const MIN_CLOUD_SPEED= 100;


function Cloud({
    startX,
    startY,
    speed,
    amplitude
}) {
    this.x = startX;
    this.y = startY;
    this.s = speed;
    this.a = amplitude
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

function moveSun({dT, sun, width, height}) {
    const deltaAngle = dT * SUN_SPEED;
    sun.angle = (sun.angle + deltaAngle) % (2 * Math.PI);
    sun.x = ORBIT_RADIUS * Math.sin(-sun.angle) + width / 2;
    sun.y = ORBIT_RADIUS * Math.cos(sun.angle) + height * HORIZONT; 
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



function drawHouse(ctx, centrX, centrY , houseWidht, houseHight, windowWidht, windowHight) {
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
    ctx.rect(centrX - windowWidht/2, centrY + (houseHight - windowHight)/2, windowWidht, windowHight);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "grey";
    ctx.moveTo(centrX,  centrY + (houseHight - windowHight)/2);
    ctx.lineTo(centrX,  centrY + (houseHight + windowHight)/2);
    ctx.stroke();

    ctx.moveTo(centrX - windowWidht/2,  centrY + houseHight/2);
    ctx.lineTo(centrX + windowWidht/2,  centrY + houseHight/2);
    ctx.stroke();
}

function redraw({ctx, width, height, clouds, sun, sky}) {
    drawSky({ctx, sky, width, height}); 
    drawSun({ctx, sun});
    drawGrass(ctx, width, height);
   
    for (const cloud of clouds) { 
        drawCloud({ctx, cloud, rX: CLOUD_RADIUS_X, rY: CLOUD_RADIUS_Y});
    }
    drawHouse(ctx, width/2, height/2, HOUSE_WIDHT, HOUSE_HEIGHT, WINDOW_WIDHT, WINDOW_HEIGHT);
}

function moveCloud({distance, cloud, width, height}) {
    cloud.x -= distance;
    cloud.y += cloud.a * Math.sin(cloud.x * cloud.a * 10/ width);
    if (cloud.x + CLOUD_SIZE * 1.5 < 0) {
        cloud.x = width + CLOUD_SIZE * 1.5;
        cloud.y = (height * (1 - HORIZONT)) /2;
    }
}

function createCloud({boxWidth, boxHeight, speed, amplitude}) {
    const startX = boxWidth;
    const startY = boxHeight;
    return new Cloud({
        startX,
        startY,     
        speed,
        amplitude
    });
}

function moveClouds({dT, clouds, width, height}) {
    for (const cloud of clouds) {
        distance = cloud.s * dT;
        moveCloud({
            distance,
            cloud,
            width,
            height
        });   
    } 
}

function update({clouds, sun, sky, width, height, deltaTime}) {
    dT = deltaTime;
    moveClouds({dT, clouds, width, height}); 
    moveSun({dT, sun,  width, height});
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

   
    let clouds = [];

    for (let i = 0; i < CLOUD_COUNT; i++) {
        clouds.push(createCloud({
            boxWidth: Math.random() * width,
            boxHeight: Math.random() * 50 + MIN_CLOUDS_LEVEL,
            speed: Math.random() * CLOUD_SPEED + MIN_CLOUD_SPEED,
            amplitude: Math.random()
        }));
    }

    let sun = new Sun({startX: width / 4, startY: height / HORIZONT, radius: RADIUS, angle: 0.5 * Math.PI});
    let hsl = new HslColor({hue: SKY_COLOR, saturation: 0.5, lightness: 50});
    let sky = new Sky({color: hsl});
   
    redraw({ctx, width, height, clouds, sun, sky});
    
    //cloud = clouds[1];

    let lastTimestamp = Date.now(); //текущее время в ms
    const animateFn = () => {
        const currentTimeStamp = Date.now();
        const deltaTime = (currentTimeStamp - lastTimestamp) * 0.001; //сколько секунд прошло с прошлого кадра
        lastTimestamp = currentTimeStamp;
        update({clouds, sun, sky, width, height, deltaTime});
        redraw({ctx, width, height, clouds, sun, sky});
        requestAnimationFrame(animateFn);
    }
    animateFn();
}