(function () {
    let lat = document.querySelector('.coord-lat');
    let lon = document.querySelector('.coord-lon');
    const getCoordsBtn = document.getElementById('getCoords')

    function getCoordinates() {

        navigator.geolocation.getCurrentPosition((data) => {
            console.log(data);
            lat.innerHTML = data.coords.latitude;
            lon.innerHTML = data.coords.longitude;

        }, (err) => {
            console.error(err);
        });
    }

    getCoordsBtn.addEventListener('click', () => {
        getCoordinates();
    });
})();

