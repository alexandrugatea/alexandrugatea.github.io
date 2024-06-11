const api = {
    location: {
        url: `https://api.locationiq.com/v1/autocomplete.php?`,
        params: {
            key: "pk.fa6e80804f9289787659846f822b3ee3",
            q: "",
            limit: 5,
            dedupe: 1
        }
    },
    weather: {
        url: `https://api.weatherapi.com/v1/forecast.json`,
        params: {
            key: "62853d9a45c1413b89f201737240106",
            days: 7,
        }
    }
};

function getLocationApiURL(query) {
    const location = { ...api.location };
    location.params.q = query;
    return populateParams(location.url, location.params);
}

function getWeatherApiURL({ city = null, lat = null, lon = null }) {
    const weather = { ...api.weather };
    const params  = { ...weather.params };

    if (city) {
        params.q = city;
    } else if (lat !== null && lon !== null) {
        params.q = `${lat},${lon}`;
    } else {
        throw new Error("Either city or both lat and lon must be provided");
    }

    return populateParams(weather.url, params);
}

function populateParams(baseUrl, params) {
    const url = new URL(baseUrl);
    Object.keys(params).forEach(key => {
        url.searchParams.append(key, params[key]);
    });
    return url.toString();
}


export {
    api,
    getLocationApiURL,
    getWeatherApiURL
};

