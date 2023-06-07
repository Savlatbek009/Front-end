// GLOBAL VARIABLES
var canvas = document.querySelector('canvas'), toolBtns = document.querySelectorAll('.tool'), fillColor = document.querySelector('#fill-color'), sizeSlider = document.querySelector('#size-slider'), colorBtns = document.querySelectorAll('.colors .option'), colorPicker = document.querySelector('#color-picker'), clearCanvasBtn = document.querySelector('.clear-canvas'), saveImageBtn = document.querySelector('.save-img');
// VARIABLE WITH DEFAULT VALUE
var ctx = canvas.getContext('2d'), isDrawing = false, brushWidth = 5, selectedTool = 'brush', selectedColor = '#000', prevMouseX, prevMouseY, snapshot;
// SET CANVAS BACKGROUND
var setCannvasBackground = function () {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = selectedColor;
};
// SET CANVAS WIDTH AND HEIGHT
window.addEventListener('load', function () {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCannvasBackground();
});
// START DRAWING
var startDraw = function (e) {
    isDrawing = true;
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
};
// DRAW RECTANGLE
var drawRectangle = function (e) {
    fillColor.checked
        ? ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
        : ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
};
// DRAW CIRCLE
var drawCircle = function (e) {
    ctx.beginPath();
    var radius = Math.sqrt(Math.pow(prevMouseX - e.offsetX, 2)) + Math.pow(prevMouseY - e.offsetY, 2);
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
    fillColor.checked ? ctx.fill() : ctx.stroke();
};
// DRAW TRIANGLE
var drawTriangle = function (e) {
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
    ctx.closePath();
    fillColor.checked ? ctx.fill() : ctx.stroke();
};
// DRAWING
var drawing = function (e) {
    if (!isDrawing)
        return;
    ctx.putImageData(snapshot, 0, 0);
    switch (selectedTool) {
        case 'brush':
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            break;
        case 'rectangle':
            drawRectangle(e);
            break;
        case 'circle':
            drawCircle(e);
            break;
        case 'triangle':
            drawTriangle(e);
            break;
        case 'eraser':
            ctx.strokeStyle = '#fff';
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            break;
        default:
            break;
    }
};
// TOOLS BTN AND SET TO VARIABLES SELECTED TOOL
toolBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
        document.querySelector('.options .active').classList.remove('active');
        btn.classList.add('active');
        selectedTool = btn.id;
    });
});
// CHANGE BRUSH WITH
sizeSlider.addEventListener('change', function () { return (brushWidth = sizeSlider.value); });
// SET COLOR TO SHAPES
colorBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
        document.querySelector('.options .selected').classList.remove('selected');
        btn.classList.add('selected');
        var bgColor = window.getComputedStyle(btn).getPropertyValue('background-color');
        selectedColor = bgColor;
    });
});
// SET COLOR FROM COLOR PICKER
colorPicker.addEventListener('change', function () {
    colorPicker.parentElement.style.background = colorPicker.value;
    colorPicker.parentElement.click();
});
// CLEAR CANVAS BUTTON
clearCanvasBtn.addEventListener('click', function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setCannvasBackground();
});
// SAVE LIKE IMAGE OUR PAINT
saveImageBtn.addEventListener('click', function () {
    var link = document.createElement('a');
    link.download = "Sammi-paint".concat(Date.now(), ".jpg");
    link.href = canvas.toDataURL();
    link.click();
});
// STOP DRAWING
var stopDraw = function () {
    isDrawing = false;
};
canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mousemove', drawing);
canvas.addEventListener('mouseup', stopDraw); // GLOBAL VARIABLES
var canvas = document.querySelector('canvas'), toolBtns = document.querySelectorAll('.tool'), fillColor = document.querySelector('#fill-color'), sizeSlider = document.querySelector('#size-slider'), colorBtns = document.querySelectorAll('.colors .option'), colorPicker = document.querySelector('#color-picker'), clearCanvasBtn = document.querySelector('.clear-canvas'), saveImageBtn = document.querySelector('.save-img');
// VARIABLE WITH DEFAULT VALUE
var ctx = canvas.getContext('2d'), isDrawing = false, brushWidth = 5, selectedTool = 'brush', selectedColor = '#000', prevMouseX, prevMouseY, snapshot;
// SET CANVAS BACKGROUND
var setCannvasBackground = function () {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = selectedColor;
};
// SET CANVAS WIDTH AND HEIGHT
window.addEventListener('load', function () {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCannvasBackground();
});
// START DRAWING
var startDraw = function (e) {
    isDrawing = true;
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
};
// DRAW RECTANGLE
var drawRectangle = function (e) {
    fillColor.checked
        ? ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
        : ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
};
// DRAW CIRCLE
var drawCircle = function (e) {
    ctx.beginPath();
    var radius = Math.sqrt(Math.pow(prevMouseX - e.offsetX, 2)) + Math.pow(prevMouseY - e.offsetY, 2);
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
    fillColor.checked ? ctx.fill() : ctx.stroke();
};
// DRAW TRIANGLE
var drawTriangle = function (e) {
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
    ctx.closePath();
    fillColor.checked ? ctx.fill() : ctx.stroke();
};
// DRAWING
var drawing = function (e) {
    if (!isDrawing)
        return;
    ctx.putImageData(snapshot, 0, 0);
    switch (selectedTool) {
        case 'brush':
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            break;
        case 'rectangle':
            drawRectangle(e);
            break;
        case 'circle':
            drawCircle(e);
            break;
        case 'triangle':
            drawTriangle(e);
            break;
        case 'eraser':
            ctx.strokeStyle = '#fff';
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            break;
        default:
            break;
    }
};
// TOOLS BTN AND SET TO VARIABLES SELECTED TOOL
toolBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
        document.querySelector('.options .active').classList.remove('active');
        btn.classList.add('active');
        selectedTool = btn.id;
    });
});
// CHANGE BRUSH WITH
sizeSlider.addEventListener('change', function () { return (brushWidth = sizeSlider.value); });
// SET COLOR TO SHAPES
colorBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
        document.querySelector('.options .selected').classList.remove('selected');
        btn.classList.add('selected');
        var bgColor = window.getComputedStyle(btn).getPropertyValue('background-color');
        selectedColor = bgColor;
    });
});
// SET COLOR FROM COLOR PICKER
colorPicker.addEventListener('change', function () {
    colorPicker.parentElement.style.background = colorPicker.value;
    colorPicker.parentElement.click();
});
// CLEAR CANVAS BUTTON
clearCanvasBtn.addEventListener('click', function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setCannvasBackground();
});
// SAVE LIKE IMAGE OUR PAINT
saveImageBtn.addEventListener('click', function () {
    var link = document.createElement('a');
    link.download = "as_paint".concat(Date.now(), ".jpg");
    link.href = canvas.toDataURL();
    link.click();
});
// STOP DRAWING
var stopDraw = function () {
    isDrawing = false;
};
canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mousemove', drawing);
canvas.addEventListener('mouseup', stopDraw);
