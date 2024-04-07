(function () {
    const canvas = document.getElementById("draw");
    const ctx = canvas.getContext('2d');

    const container = document.getElementById("canvasWrapper");
    // let containerStyle = getComputedStyle(container)
    // let cW = container.clientWidth - 2 * (parseFloat(containerStyle.paddingLeft))
    // let cH = container.clientHeight - 2 * (parseFloat(containerStyle.paddingTop))
    
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    ctx.strokeStyle = '#070707';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 21;
    // ctx.globalCompositeOperation='multiply';



    let hue = 0;
    let hueDirection = true;
    let lineDirection = true;

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    
    // A helper function to get correct coordinates
    function getEventPos(e) {
        let rect = canvas.getBoundingClientRect();
        
        // Check if it's a touch event
        if (e.touches) {
            return {
                offsetX: e.touches[0].clientX - rect.left,
                offsetY: e.touches[0].clientY - rect.top
            };
        } else {
            return {
                offsetX: e.offsetX,
                offsetY: e.offsetY
            };
        }
    }

    function draw(e) {
        if (!isDrawing) return; // stop the function from running unless mousedown
        e.preventDefault();

        const { offsetX, offsetY } = getEventPos(e);

        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.beginPath();

        // start from
        ctx.moveTo(lastX, lastY);

        // go to
        // ctx.lineTo(e.offsetX, e.offsetY);
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
        // [lastX, lastY] = [e.offsetX, e.offsetY];
        lastX = offsetX;
        lastY = offsetY;

        if (hue >= 98) hueDirection = false;
        if (hue < 0) hueDirection = true;
        hueDirection ? hue++ : hue--;

        if (ctx.lineWidth >= 77) lineDirection = false;
        if (ctx.lineWidth <= 1) lineDirection = true;
        lineDirection ? ctx.lineWidth++ : ctx.lineWidth--;

    }


    function stopDrawing() {
        isDrawing = false
    }

    function startDrawing(e) {
        isDrawing = true;
        // [lastX, lastY] = [e.offsetX, e.offsetY];
        const { offsetX, offsetY } = getEventPos(e);
        [lastX, lastY] = [offsetX, offsetY];
    }

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    canvas.addEventListener("touchmove", draw, { passive: false });
    canvas.addEventListener("touchstart", startDrawing, { passive: false });
    canvas.addEventListener("touchend", stopDrawing, { passive: false });
    
})();