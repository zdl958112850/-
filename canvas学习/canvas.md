<!--
 * @Author: your name
 * @Date: 2020-03-29 11:03:47
 * @LastEditTime: 2020-03-29 17:20:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \undefinedc:\Users\admin\Desktop\canvas学习\canvas.md
 -->

## 判断是否支持canvas

``` html
<canvas>当前浏览器不支持canvas</canvas>
```

``` js
var canvas = document.getElementById('canvas');
if (canvas.getContext) {
    // 使用这句话来看当前浏览器是否支持canvas
}
```

## 绘制圆形

``` js
ctx.arc(x, y, radius, startAngle, endAngle, anticlock); // 最后一个表示是否是顺时针, 还是逆时针, 默认是顺时针
```

## 线性渐变

``` js
var lingrad = ctx.createLinearGradient(0, 0, 0, 150); // 渐变对象, 从画布的0,0点开始画, 终点是0,150, 是当成线条看, 然后
/**
 * 参数1.0.0~1.0之间, 表示颜色所在的相对位置
 * 参数2: 颜色, white, #235426 rgba(234,4,35)
 * /

linegrad.addColorStop(0, '#adf');
linegrad.addColorStop(0.5, '#bdf');
linegrad.addColorStop(1, '#cdf');
ctx.fillStyle = linegrad; // 将渐变赋值给填充的颜色;
ctx.fillRect(50, 30, 40, 40)
```

## 径向渐变

``` js
/**
 * 径向渐变
 * 参数1: x1轴
 * 参数2: y1轴 参数1, 2你表示第一个圆的圆心
 * 参数3: r1半径
 * 参数4: x2轴  参数4, 5表示第二个圆的圆心
 * 参数5: y2轴
 * 参数6: r2半径
 * /
   var radgrad = ctxs.createRadialGradient(45,45,10,50,50,30);
   radgrad.addColorStop(0, '#A7D30C')
   radgrad.addColorStop(0.5,'#019F63')
   radgrad.addColorStop(1,'rgba(1,150,98,0)')
   ctx.fillStyle = radgrad;
   ctx.fillRect(0,0,150,150)
```

## 将图片绘制到canvas中

``` js
var ctx = canvas.getContext('2d');
var img = new Image();
img.src = 'image.png';
img.onload = function() { // 注意: 这块一定要在onload的时候才去执行
    var ptrn = ctx.createPattern(img, 'repeat');
    ctx.fillStyle = ptrn; // 将要渲染的赋值给颜色
    ctx.fillRect(0, 0, 800, 600);
}

// 另外一种方法: 
var img = new Image();
img.src = 'image.png';
img.onload = function() {
    ctx.drawImage(this .0, 0); // this也就是img
    ctx.drawImage(this .0, 0, 200, 300); // this也就是img, img的宽高
    ctx.drawImage(this .0, 0, 120, 100, 150, 50, 100, 50); // 表示从150, 50开始裁剪, 然后裁剪100 和 50 大小
}
```

## 绘制文字

``` js
var ctx = canvas.getContext('2d');

ctx.shadowColor = 'Orange'; // 给文字设置阴影
ctx.shadowBlur = 10;
ctx.shadowOffsetX = 20;
ctx.shadowOffsetY = 20; // 表示x, y轴的偏移量

// 使用线性渐变
var lingrad = ctx.createLinearGradieent(100, 200, 500, 200);
lingrad.addColorStop(0.5, '#ccc')
lingrad.addColorStop(1, '#000')

ctx.font = 'bold italic 160px arial';

// font-weight font-style font-size font-family
ctx.fillStyle = lingrad;
ctx.filltext('Henry', 100, 200) // 100, 200 表示绘制的起点

``
` 

## 裁剪图片

`
``
js
// 另外一种方法: 
var img = new Image();
img.src = 'image.png';
img.onload = function() {
    ctx.beginPath();
    ctx.arc(400, 200, 150, 0, Math.PI * 2);
    ctx.fill();
    ctx.clip();
    ctx.drawImage(this .150, 110); // 绘制一个圆形的裁剪后的图片
}
```

## 涂鸦功能

``` js
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.onmousedown = function(e) {
    e = e // window.event;
    var x = e.clientX - canvas.offsetLeft;
    var y = e.clientY - canvas.offsetTop;
    ctx.beginPath();
    ctx.moveTo(x, y);
}
canvas.onmousemove = function(e) {
    var x = e.clientX - canvas.offsetLeft;
    var y = e.clientY - canvas.offsetTop;
    ctx.lineTo(x, y);
    ctx.stroke();
}
canvas.onmouseup = function(e) {
    canvas.onmousemove = '';
}
```

## 刮刮效果

``` html
<img src="beautiful.jpg">
<canvas id="canvas" width="800" height="600"></canvas>
```

``` js
var ctx = canvas.getContext('2d');
// 1. 将图片用灰色盖住
ctx.beginPath();
ctx.fillStyle = 'gray';
ctx.fillRect(0, 0, canvs.width, canvas.height);
ctx.globalCompositeOperation = 'destination-out';
ctx.lineWidth = 20;
ctx.lineCap = 'round';
canvas.onmousedown = function(e) {
    var ev = e // window.event;
    var x = ev.clientX;
    var y = ev.clientY;
    ctx.moveTo(x, y);
}
canvas.onmousemove = function(e) {
    var ev = e // window.event;
    var x = ev.clientX;
    var y = ev.clientY;
    ctx.lineTo(x, y);
    ctx.stroke();
}
canvas.onmouseup = function() {

    canvas.onmousemove = '';
}
```
## 帧动画
```js
// 通过
window.requestAnimationFrame(move); 
// 这样就能够连续的调用move, 是一个递归的调用
```
## 面向对象的圆形动画反弹
```js
function draw() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx= canvas.getContext('2d');
        //圆形碰撞
        function Ball(x,y,r,speedX, speedY, color) {
            // 设置属性
            this.x = x;
            this.y = y;
            this.speedX = speedX;
            this.speedY = speedY;
            this.color = color;
            // 设置方法
            this.draw = function () {
                ctx.beginPath();
                ctx.fillStyle = this.color;
                ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
                ctx.fill();
            }
            this.move = function () {
                this.x += this.speedX;
                if (this.x > canvas.width -this.r) {
                    this.speedX *= -1;
                } else if (this.x< this.r) {
                    this.speedX*=-1;
                }
                this.y += this.speedY;
                if (this.y > canvas.height - this.r) {
                    this.speedY *= -1;
                } else if (this.y < this.r) {
                    this.speedY *= -1;
                }
            }
            
        }
        var ball = new Ball (100, 100, 50,2,2,'blue')
        ball.draw();
        function start() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ball.draw();
            ball.move();
            window.requestAnimationFrame(start);
        }
    }
}
```
## 全景背景
```html
<canvas id="canvas" width="1024" height="300"></canvas>
```
```js
// 水平背景移动
function backgroundMove() {
    // 记录状态
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImage, 0, 0);
    ctx.drawImage(bgImage, canvas.width, 0);
    // 判断x的偏移量
    x++;
    if (x >= canvas.width) {
        x=0;
    }
    ctx.restore();
    window.requestAnimationFrame(backgroundMove)
}
var bgImg = new Image ();
bagImg.onload = function() {
    backgroundMove();
}
```
## 飞机大战
```js
// 绘制无限的背景图
function bgMove() {
    ctx.save();
    ctx.clearRect(0,0,canvas.width,canvas.heigh);
    ctx.translate(0,y);
    ctx.drawImage(bgImage, 0, 0);
    ctx.drawImaeg(bgImage, 0, canvas.height * -1);
    y++;
    if(y>=canvas.height) {
        y =0;
    }
    xtx.restore();
    windwo.requestAnimationFrame(bgMove);
}
```
## 微信打飞机
```html
<canvas id="backgroundCanvas" width="320" height="568"></canvas>

<canvas id="heroCanvas" width="320" height="568"></canvas>
```
```js 
function drawAirplane() {
    var bgCanvas = document.getElementById('canvas');
    if (baCanvas.getContext) {
        var bgURL = 'img/background.png';
        // 1. 加载图片的方法
        loadBackground(bgURL, bgCanvas, moveBackground) // 想要调用另外一个js中的方法, 需要使用script引入,通过毁掉函数的方式传递过来
        function moveBackground(bgImage) {
            var bgSound =  new Audio('audio/game_muic.mp3');
            bgSound.loop = true;
            bgsound.play();
            // 滚动背景
            setInterval(function(){
                var speed = 5;
                animateBackground(bgCanvas, bgImage, speed)
            }, 30)
        }

        new Image();
    }
};
```

```js
// 在background.js中
function loadBackground(bgURL, canvas, completeCallback) {
    var context = canvas.getContext('2d');
    var width = canvas.width;
    var hegiht = canavas.hegiht;
    var image = new Image();
    image.onload = function() {
        context.drawImage(this, 0, 0, width, height);
        context.drawImage(this, 0, -height, width) // 这儿是要画两张相同的图片主要是为了让他没有断掉
        if(completeCallback) {
            completeCallback(image); // 如果传递了毁掉函数就执行该毁掉函数
        }
    }
    image.src = bgURL
}

var backgrounOffset = 0;
function animateBackground(canvas, image, speed) {
    var context  = canvas.getContext('2d');
    var width = canvs.width;
    var height = canvas.height;
    //清楚画布
    context.clerarRect(0, 0, canvs.width, canvas.height);
    context.save() // 存储状态, 关于canvas的状态都可以保存下来
    // 更新位置
    backgroundOffset += speed;
    // 偏移量大于画布的高度的时候又将画布重新移动至最开始的位置, 相当于无缝轮播
    if (backgroundOffset >= height) {
        backgroundOffset = 0;
    }

    // 这句话是把canvas的画布整体移动到backgroundOffset的位置, 然后再去绘制背景
    context.translate(0, backgroundOffset); 
    // 绘制图片
    context.drawImage(image, 0, 0, width, height);
    context.drawImage(image, 0, -height, width, height);

    // 获取存储状态, 将之前的画布的位置恢复
    context.restore();
}
```
## 收获
-  在绘制小车的时候可以使用多个画布来实现, 多个画布之间相互不影响, 从而达到只需清楚小车而不去清楚背景  
-  通过绝对定位的方式