(function () {
    console.clear();
    const totalTimeContainer = document.getElementById('totalTime');
    const timeNodes = Array.from(document.querySelectorAll("[data-time]"));

    const seconds = timeNodes
        .map(node => node.dataset.time)
        .map(timeCode => {
            // tutorial only showed mins and secs, but I adjusted to also calculate hours

            // define a reversed array [seconds, minutes, hours], split each timeCode
            // and push it into the array, then reverse them
            // Why?
            // because original times are in hr:min:sec, but not all times have hours. most of them are just mm:ss
            // by reversing, we get [ss, mm, hr], and if hr is not available it will return "undefined"
            // and it's easier to calculate when we know that in any case, the time[2] === hours (and possibly undefined)
            let [secs, mins, hr] = timeCode.split(":").map(parseFloat).reverse();

            // then, if hours is not available in a video, just assign it 0
            hr === undefined ? hr = 0 : hr = hr;

            // return total number of seconds in a videos
            return (hr * 3600) + (mins * 60) + secs;
        })

        // sum up all video durations
        .reduce((total, vidSeconds) => total + vidSeconds);

    // .map() takes in an array and exports an array
    // .reduce() takes in an array end exports anything we need to

    // console.log("Total number if seconds is %s", seconds)
    

    let secondsLeft = seconds;

    // calculate hours
    const hours = Math.floor(secondsLeft / 3600);

    // update seconds left
    secondsLeft = secondsLeft % 3600;

    // calculate minutes
    const minutes = Math.floor(secondsLeft / 60);

    // update seconds left
    secondsLeft = secondsLeft % 60;

    // console.log("Video duration is: " + hours + " hours, " + minutes + " minutes and " + secondsLeft + " seconds");



    // console.log("Video duration is: %s hours, %s minutes and %s seconds.", hours, minutes, secondsLeft);
    totalTimeContainer.innerHTML = `
        Video duration is:  ${hours}<span> hours</span>, ${minutes}<span> minutes</span>, ${secondsLeft}<span> seconds</span>
    `
})();