const canvas = document.getElementById("my-canvas");

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const ctx = canvas.getContext("2d");

    const clearBtn = document.getElementById("clear-btn");
    const redBtn = document.getElementById("red-btn");
    const blueBtn = document.getElementById("blue-btn");
    const greenBtn = document.getElementById("green-btn");
    const blackBtn = document.getElementById("black-btn");
    const eraserBtn = document.getElementById("eraser-btn");
    const colorPicker = document.getElementById("color-picker");
    const thicknessSlider = document.getElementById("thickness-slider");

    let drawing = false;
    let erasing = false;
    let x1, y1;
    let previousColor = "#000000"; 

    ctx.strokeStyle = previousColor;
    ctx.lineWidth = thicknessSlider.value;

    colorPicker.addEventListener("change", (e) => {
        ctx.strokeStyle = e.target.value;
        previousColor = e.target.value;
        erasing = false; 
    });

    thicknessSlider.addEventListener("input", (e) => {
        if (!erasing) {
            ctx.lineWidth = e.target.value;
        }
    });

    clearBtn.addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    redBtn.addEventListener("click", () => setColor("#FF0000"));
    blueBtn.addEventListener("click", () => setColor("#0000FF"));
    greenBtn.addEventListener("click", () => setColor("#00FF00"));
    blackBtn.addEventListener("click", () => setColor("#000000"));

    
    function setColor(color) {
        ctx.strokeStyle = color;
        previousColor = color;
        colorPicker.value = color;
        erasing = false;
        ctx.lineWidth = thicknessSlider.value;
        
    }

    eraserBtn.addEventListener("click", () => {
        erasing = !erasing;
        if (erasing) {
            ctx.strokeStyle = "#FFFFFF";
            ctx.lineWidth = 5;
        } else {
            ctx.strokeStyle = previousColor;
            ctx.lineWidth = thicknessSlider.value;
        }
    });

    canvas.addEventListener("mousedown", (e) => {
        init(e);
    });
    canvas.addEventListener("mousemove", (e) => {
        draw(e);
    });
    canvas.addEventListener("mouseup", () => {
        drawing = false;
    });

    function init(e) {
        x1 = e.offsetX; 
        y1 = e.offsetY;
        drawing = true;
    }

    function draw(e) {
        if (drawing) {
            if (erasing) {
                ctx.lineWidth = 5;
            } else {
                ctx.lineWidth = thicknessSlider.value;
            }
            ctx.beginPath(); 
            ctx.moveTo(x1, y1);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            ctx.closePath();
            x1 = e.offsetX; 
            y1 = e.offsetY;
        }
    }