(function () {
    const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];
    
    const unsortedBands = document.getElementById("unsortedBands");
    unsortedBands.innerHTML = bands.map(band => `<li>${band}</li>`).join("")
    // sort by name excluding the articles, as articles don't go into alphabetizing the names
    
    function wrapArticleAndFirstLetter(bandName) {
        // Regex to identify the article and the first letter of the band name
        const regex = /^(a |the |an )?(.*)$/i;
        const match = bandName.match(regex);

        if (!match) return bandName; // Return original if no match is found for safety

        const article = match[1] ? `<span class="article">${match[1]}</span>` : ''; // Wrap article in <span> if exists
        const restOfName = match[2] ? match[2] : ''; // The rest of the band name

        if (restOfName) {
            // Splitting the rest of the name and wrapping the first letter in <b>
            const firstLetter = restOfName[0];
            const remainingLetters = restOfName.slice(1);
            return `${article}<b>${firstLetter}</b>${remainingLetters}`;
        }

        return bandName; // Fallback to the original name if any issue
    }

    function strip(bandName) {
        return bandName.replace(/^(a |the |an )/i, '').trim(); // created a regex to strip the articels in front of names 
    }
    // create a sort function that will check the striped names and will sort them without taking articles into account
    const sortedBands = bands.sort((a, b) => strip(a) > strip(b) ? 1 : -1);

    // populate an HTML element with the correct order of elements in Bands array
    const bandsContainer = document.getElementById("bands");
    bandsContainer.innerHTML =
        sortedBands
        .map(band => `<li>${wrapArticleAndFirstLetter(band)} </li>`)
            .join("");

   
})();