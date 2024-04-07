(function () {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    let p = document.createElement('p');
    const words = document.querySelector('.words');
    words.appendChild(p);

    const start = document.getElementById('start');
    const stop  = document.getElementById('stop');
    stop.setAttribute('disabled', 'disabled');

    function getWeather() {
        let apiKey = 'fd40260f39e3f3da4cf1fa38318321eb';
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=46.7766247&lon=23.6296111&appid=${apiKey}&units=metric`;

        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const temp = data.main.temp;
                return temp;
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                throw error;
            });
    }

    recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
            .map((result) => result[0])
            .map((result) => result.transcript)
            .join('');
        p.textContent = transcript;
        if (e.results[0].isFinal) {
            if (transcript.includes('dog')) {
                let dog = document.createElement('p');
                dog.innerText = "🐶 Woof!";
                dog.style.fontSize = "100px";
                dog.style.padding = "20px 30px"
                words.appendChild(dog);
                prepareNewParagraph()
            } else if (transcript.includes("weather")) {
                getWeather().then(temp => {
                    let w = document.createElement('p');
                    w.innerText = `The current temperature is ${temp}°C`;
                    words.appendChild(w);
                    prepareNewParagraph()
                });
            }
            prepareNewParagraph()
        }
        console.log(transcript);
    });

    function prepareNewParagraph() {
        p = document.createElement('p');
        words.appendChild(p);
    }

    // recognition.addEventListener("end", recognition.start);
    recognition.addEventListener("end", () => {
        if (start.disabled) { // Only auto-restart if the stop button wasn't pressed
            recognition.start();
        }
    });
    // recognition.start();

    start.addEventListener('click', () => {
        recognition.start();
        start.disabled = true;
        stop.disabled = false;
    });

    stop.addEventListener('click', () => {
        recognition.stop();
        start.disabled = false;
        stop.disabled = true;
    });

})();