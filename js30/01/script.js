(function () {
    console.clear();

    window[`01`] = function () {
        // Perform cleanup tasks here, e.g., remove event listeners
        window.removeEventListener("keydown", (e) => playAudio(e, e.code));
    };


    const keys = document.querySelectorAll(".key:not(.prevent-monkey)");
    
    keys.forEach(key => {
        key.addEventListener("click", (e) => playAudio(e, e.target.dataset.key));
        // key.addEventListener("touchstart", (e) => playAudio(e, e.target.dataset.key), { passive: true });
        key.addEventListener("transitionend", removeTransition);
    });
    
    window.addEventListener("keydown", (e) => playAudio(e, e.code));
    
    function removeTransition(e) {
        if (e.propertyName !== "transform") return;
        e.target.classList.remove("playing");
    }
    
    function playAudio(e, keyIdentifier) {
        const audio = document.querySelector(`audio[data-key="${keyIdentifier}"]`);
        const key = document.querySelector(`.key[data-key="${keyIdentifier}"]`);
    
        if ((!audio)) return;
        // 
        audio.currentTime = 0;
        audio.play();
        key.classList.add('playing');
        key.classList.add('prevent-monkey');
        setTimeout(() => {
            key.classList.remove('playing');
        }, 200);
    }
})();

