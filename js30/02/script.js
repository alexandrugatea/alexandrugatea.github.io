(function () {

    const secondsHand = document.querySelector(".second-hand");
    const minutesHand = document.querySelector(".min-hand");
    const hoursHand = document.querySelector(".hour-hand");
    const allHands = document.querySelectorAll('.hand')
    const face = document.querySelector('#numbers');
    
    (function displayClockFaceNumbers() {
        for (let i=1; i<=12; i++) {
            const wf = document.createElement("span");
            wf.classList.add("wf");
            wf.innerText = i;
            face.appendChild(wf);
        }

        for (let i=1; i<=60; i++) {
            const dot = document.createElement("span");
            dot.classList.add("dot");
            face.appendChild(dot);
        }

        let numbers = document.querySelectorAll(".wf");
        let faceSize = face.clientWidth;
        semiCircle(numbers, 0, 0, faceSize / 2, faceSize / 2, -60, 300, 0);

        let dots = document.querySelectorAll(".dot");
        semiCircle(dots, 0, 0, faceSize / 2, faceSize / 2, 0, 360, 0);
    })();

    function setDate() {
        const now = new Date();
        const seconds = now.getSeconds();
        const secondsDeg = seconds / 60 * 360 + 90;
        secondsHand.style.transform = `rotate(${secondsDeg}deg)`;
    
        if (secondsDeg === 90) {
            allHands.forEach(hand => hand.style.transition = 'none')
        } else {
            allHands.forEach(hand => hand.style.transition = '')
        }
    
        const minutes = now.getMinutes();
        const minutesDeg = minutes / 60 * 360 + 90;
        minutesHand.style.transform = `rotate(${minutesDeg}deg)`;
    
        const hours = now.getHours();
        const hoursDeg = hours / 12 * 360 + 90;
        hoursHand.style.transform = `rotate(${hoursDeg}deg)`;
    
    }

    function semiCircle(elements, cx, cy, radius, radiusY = radius, startDegrees = 0, endDegrees = 360, length) {
        let startRadians = (startDegrees * Math.PI) / 180,
            endRadians = (endDegrees * Math.PI) / 180,
            stepRadians = (endRadians - startRadians) / (elements.length - length);

        elements.forEach((element, i) => {
            let a = i * stepRadians + startRadians,
                x = Math.cos(a) * radius + cx,
                y = Math.sin(a) * radiusY + cy;

            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
        });
    }
    
    setInterval(setDate, 1000);
    
    setDate();
    
})();