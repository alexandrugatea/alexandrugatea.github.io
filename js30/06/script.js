(function () {

    const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

    const cities = [];
    fetch(endpoint)
        .then(blob => blob.json())
        .then(data => cities.push(...data)) // push() will create a nested array in array; .push(...) where ... = spread into push method

    function findMatches(wordToMatch, cities) {
        return cities.filter(place => {
            // determine if a city or state matches the search input
            const regex = new RegExp(wordToMatch, 'gi')
            return place.city.match(regex) || place.state.match(regex) || place.population.match(regex);
        });
    }

    function displayMatches() {
        const matchArray = findMatches(this.value, cities);

        const html = matchArray.map(place => {
            const regex = new RegExp(this.value, 'gi');
            const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`)
            const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`)
            return `
        <li>
          <span class="name">${cityName}, ${stateName}</span>
          <span class="population">${numberWithCommas(place.population)}</span>
        </li>
      `;
        }).join("");

        // if a match is found display it otherwise display the original HTML
        this.value === '' ? suggestions.innerHTML = originalSuggestion : suggestions.innerHTML = html;

        // if no mathches are found, display an info
        if (matchArray.length === 0) {
            suggestions.innerHTML = `
        <li>
          <span class="name">No city or state found based on <span class="hl tt">${this.value}</span></span>
        </li>
      `
        }
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    const searchInput = document.querySelector(".search");
    const suggestions = document.querySelector(".suggestions");
    const originalSuggestion = suggestions.innerHTML;

    searchInput.addEventListener("input", displayMatches);
})();