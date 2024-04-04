(function () {
    console.clear();
    const speed = document.querySelector('.speed');
    const bar = speed.querySelector('.speed-bar');
    const video = document.querySelector('.flex');

    speed.addEventListener('mousemove', function (e) {
        const y = e.pageY - this.offsetTop;
        const percent = y / this.offsetHeight;

        const min = 0.8;
        const max = 2;
        const height = Math.round(percent * 100) + '%';
        const playbackRate = percent * (max - min) + min;
        bar.style.height = height;
        bar.textContent = playbackRate.toFixed(2) + 'x';
        video.playbackRate = playbackRate;
    });
})();