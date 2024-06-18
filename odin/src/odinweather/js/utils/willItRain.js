function willItRain(data) {
    const rainChance = parseInt(data.chanceOfRain);
    const snowChance = parseInt(data.chanceOfSnow);

    if (rainChance >= snowChance)  {
        return `
            <i>rainy</i>
            <div class="weather-rain-snow-chance">${rainChance}%</div>`
    } else {
        return `
            <i>ac_unit</i>
            <div class="weather-rain-snow-chance">${snowChance}%</div>
            `
    }
}

export { willItRain }