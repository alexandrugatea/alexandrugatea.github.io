(function () {
    const video = document.querySelector('.player');
    const canvas = document.querySelector('.photo');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const strip = document.querySelector('.strip');
    const snap = document.querySelector('.snap');

    const enableCamera = document.getElementById("enableCamera");
    const disableCamera = document.getElementById("disableCamera");
    const sidebar = document.querySelector('.js30-side');
    let paintInterval; // Variable to store the interval ID for clearing later

    // Improved error handling and feedback
    async function getVideo() {
        return new Promise(async (resolve, reject) => {
            try {
                const localMediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
                video.srcObject = localMediaStream;
                video.play();
                video.oncanplay = () => resolve(); // Resolve when video can play
            } catch (err) {
                console.error("Oh no, camera not allowed", err);
                reject(err);
            }
        });
    }

    function paintToCanvas() {

        const width = video.videoWidth / 4;
        const height = video.videoHeight / 4;
        canvas.width = width;
        canvas.height = height;

        // Clear previous interval if it exists to avoid multiple intervals running
        if (paintInterval) clearInterval(paintInterval);

        paintInterval = setInterval(() => {
            ctx.drawImage(video, 0, 0, width, height);
            // Example processing
            let pixels = ctx.getImageData(0, 0, width, height);
            // apply modifications to pixels
            // pixels = redEffect(pixels); 
            pixels = rgbSplit(pixels); 
            // pixels = greenScreen(pixels); 

            // ctx.globalAlpha = 0.1; // some ghosting effect
            // put pixels back
            ctx.putImageData(pixels, 0, 0);
        }, 16);
    }

    function takePhoto() {
        // Sound effect
        snap.currentTime = 0;
        snap.play();

        const data = canvas.toDataURL('image/jpeg');
        const link = document.createElement('a');
        link.href = data;
        link.setAttribute('download', fileName('AG_JS30_WebCam_'));
        link.innerHTML = `<img src="${data}" alt="Webcam Photo">`;
        strip.insertBefore(link, strip.firstChild);
    }

    // Self made function to add current date and time to filename
    function fileName(prefix) {
        const now = new Date();
        const year = now.getFullYear().toString();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const filename = `${prefix}${year}${month}${day}${hours}${minutes}${seconds}.png`;

        return filename;
    }

    function redEffect(pixels) {
        for (let i = 0; i < pixels.data.length; i += 4) {
            pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
            pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
            pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
        }

        return pixels;
    }

    function rgbSplit(pixels) {
        for (let i = 0; i < pixels.data.length; i += 4) {
            pixels.data[i - 150] = pixels.data[i + 0]; // RED
            pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
            pixels.data[i - 550] = pixels.data[i + 2]; // Blue
        }

        return pixels;
    }

    function greenScreen(pixels) {
        const levels = {}; // hold min and max green

        // grab every rgb inputs
        document.querySelectorAll('.rgb input').forEach((input) => {
            levels[input.name] = input.value;
        });

        for (i = 0; i < pixels.data.length; i = i + 4) {
            red = pixels.data[i + 0];
            green = pixels.data[i + 1];
            blue = pixels.data[i + 2];
            alpha = pixels.data[i + 3];

            // if a pixel is anywhere between these values
            if (red >= levels.rmin
                && green >= levels.gmin
                && blue >= levels.bmin
                && red <= levels.rmax
                && green <= levels.gmax
                && blue <= levels.bmax) {
                // take it out!
                pixels.data[i + 3] = 0;
            }
        }

        return pixels;
    }

    const shutter = document.getElementById("takePhoto");

    // video.addEventListener("canplay", paintToCanvas);
    enableCamera.addEventListener("click", async () => {
        await getVideo(); // Wait for video to be ready
        paintToCanvas();
        shutter.removeAttribute('disabled');
    });
    
    disableCamera.addEventListener("click", function () {
        if (paintInterval) clearInterval(paintInterval); // Stop the painting process
        video.pause(); // Optionally, pause the video
        paintToCanvas();
        if (video.srcObject) {
            let tracks = video.srcObject.getTracks();
            tracks.forEach(track => track.stop()); // Stop all tracks to properly turn off the camera
        }
        video.srcObject = null; // Disconnect the stream from the video element
        shutter.setAttribute('disabled', "disabled");

    });

    
    shutter.addEventListener("click", takePhoto);

})();