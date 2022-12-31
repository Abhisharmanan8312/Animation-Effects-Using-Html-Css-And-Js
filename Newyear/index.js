console.clear();
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const startBtn = document.querySelector('#start-button');
let btnOpacity = 1;
startBtn.style.opacity = btnOpacity;
let timer = 0;
const greetingText = document.querySelector('#greeting-container');
const secretMessageText = document.querySelector('#greeting-container p');
let greetingOpacity = 0;
let secretMsgOpacity = 0;
let flag = false;
let secretMsg = false;
let fireworksArr = [];
let explosionsArr = [];
class Firework {
    constructor(x, y, xVel, yVel, size, color) {
        this.x = x;
        this.y = y;
        this.xVel = xVel;
        this.yVel = yVel;
        this.size = size;
        this.hue = color;
        this.color = `hsla(${color}, 100%, 75%, 1)`;
        this.gravity = 0.2;
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
    update() {
        this.x += this.xVel;
        this.y += this.yVel;
        this.yVel += this.gravity;

        if (this.xVel > 0.1 && this.xVel < -0.1) {
            if (this.xVel > 0) {
                this.xVel -= 0.05;
            } else {
                this.xVel += 0.05;
            }
        }
    }
}
class Explosion {
    constructor(x, y, xVel, yVel, color) {
        this.x = x;
        this.y = y;
        this.xVel = xVel;
        this.yVel = yVel;
        this.size = 0;
        this.opacity = 1;
        this.hue = color;
        this.color = `hsla(${this.hue}, 100%, 75%, ${this.opacity})`;
        this.gravity = 0.1;
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
    update() {
        this.x += this.xVel;
        this.y += this.yVel;
        this.yVel += this.gravity;
        this.opacity -= Math.random() * 0.03;
        this.color = `hsla(${this.hue}, 100%, 75%, ${this.opacity})`;
        if (this.xVel > 0.1 && this.xVel < -0.1) {
            if (this.xVel > 0) {
                this.xVel -= 0.05;
            } else {
                this.xVel += 0.05;
            }
        }
        if (this.size < Math.random() * 3 + 1) {
            this.size += 0.05;
        }
    }
}
window.onload = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const showGreeting = () => {
        if (greetingText.style.opacity < 1) {
            greetingOpacity += 0.01;
            greetingText.style.opacity = greetingOpacity;
            requestAnimationFrame(showGreeting);
        }
        if (greetingText.style.opacity > 1) greetingText.style.opacity = 1;
    }
    const showSecretMsg = () => {
        console.log('secret message');
        if (secretMessageText.style.opacity < 1) {
            secretMsgOpacity += 0.01;
            secretMessageText.style.opacity = secretMsgOpacity;
            requestAnimationFrame(showSecretMsg);
        }
        if (greetingText.style.opacity > 1) greetingText.style.opacity = 1;
    }
    const getYVelocity = () => {
        let yVel = Math.random() * (canvas.height / -80 - 10);
        if (yVel > -12 && yVel < -16) {
            yVel = Math.random() * -6 - 12;
            console.log(yVel);
            return yVel;
        } else {
            console.log(yVel);
            return yVel;
        }
    }
    const startTheShow = () => {
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (timer % Math.trunc(Math.random() * 25 + 30) === 0) {
            const size = Math.random() * 2 + 1;
            const x = Math.random() * (canvas.width * 0.5) + (canvas.width * 0.25);
            const y = canvas.height + size;
            const xVel = Math.random() * 4 - 2;
            const yVel = getYVelocity();
            const color = Math.floor(Math.random() * 360);
            fireworksArr.push(new Firework(x, y, xVel, yVel, size, color));
        }
        for (let i = 0; i < fireworksArr.length; i++) {
            fireworksArr[i].update();
            fireworksArr[i].draw();

            if (fireworksArr[i].yVel > Math.random() * 3) {
                for (let j = 0; j < Math.random() * 50 + 30; j++) {
                    const x = fireworksArr[i].x;
                    const y = fireworksArr[i].y;
                    const xVel = Math.random() * 6 - 3;
                    const yVel = Math.random() * 6 - 5;
                    const color = fireworksArr[i].hue;
                    explosionsArr.push(new Explosion(x, y, xVel, yVel, color));
                }
                fireworksArr.splice(i, 1);
                i--;
            }
        }
        for (let i = 0; i < explosionsArr.length; i++) {
            explosionsArr[i].update();
            explosionsArr[i].draw();

            if (explosionsArr[i].opacity < 0.01) {
                explosionsArr.splice(i, 1);
            }
        }
        if (timer > 500 && !flag) {
            flag = true;
            showGreeting();
        }
        if (timer > 2500 && !secretMsg) {
            secretMsg = true;
            showSecretMsg();
        }
        timer++;
        requestAnimationFrame(startTheShow);
    }
    const decreaseOpacity = () => {
        if (startBtn.style.opacity > 0.05) {
            startBtn.style.opacity = Number.parseFloat(btnOpacity);
            btnOpacity -= 0.05;
            requestAnimationFrame(decreaseOpacity);
        } else {
            startBtn.style.display = 'none';
        }
    }
    const handleClick = () => {
        console.log('clicked');
        decreaseOpacity();
        startTheShow();
    }
    startBtn.addEventListener('click', handleClick);
    window.addEventListener('resize', function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        console.log(canvas.height)
    })
}