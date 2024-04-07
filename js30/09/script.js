(function () {
    const dogs = [
        { name: 'Snickers', age: 2 },
        { name: 'Hugo', age: 8 },
        { name: 'Bruno', age: 18 },
        { name: 'ketchup', age: 3 },
    ];

    // Regular
    console.log("Hello");

    // Interpolated
    let msg = "shitty";
    console.log("I am an %s developer", "awesome");
    console.log("I am a %s developer", msg);
    console.log(`I am a ${msg} developer`);

    // Styled
    console.log('%cStyled log', 'font-size: 30px; background: #070707; color: #ffc300; padding: 20px;')

    // warning!
    console.warn("Warning!")

    // Error :|
    console.error("%cError", 'background: #f00; color: #ff0; padding: 20px; font-weight: 700;font-size: 25px')

    // Info

    console.info("Your code is awesome")
    console.info("%c i Info message", "background: blue; color: white; border-radius: 20px; padding: 5px;");
    console.log("%ci Info:", "color: #9999ff; font-weight: bold;", "Your informational message here.");


    // Testing
    const p = document.querySelector('p');
    const pp = document.querySelector('.p');
    console.log(p);
    console.assert(p.classList.contains('ouch'), `Nope, <${p.tagName.toLowerCase()}> doesn't contain class = ouch`);
    console.assert(p.classList.contains('ouch'), `Nope, <${pp.localName.toLowerCase()}> from "${pp.parentNode.localName}" doesn't contain class = ouch`);

    // clearing
    // console.clear();

    // Viewing DOM Elements
    console.log(p);
    console.dir(p);

    // Grouping together
    dogs.forEach(dog => {
        console.group(`${dog.name}`)
        console.log(`This is ${dog.name}`);
        console.log(`${dog.name} is ${dog.age} years old`);
        console.log(`${dog.name} is ${dog.age * 7} dog years old`)
        console.groupEnd(`${dog.name}`);
    })

    dogs.forEach(dog => {
        console.groupCollapsed(`${dog.name}`)
        console.log(`This is ${dog.name}`);
        console.log(`${dog.name} is ${dog.age} years old`);
        console.log(`${dog.name} is ${dog.age * 7} dog years old`)
        console.groupEnd(`${dog.name}`);
    })


    // counting
    console.count(`Alex`);
    console.count(`Alex`);
    console.count(`Alex`);
    console.count(`Alex`);

    // timing
    console.time('fetching data');
    fetch('https://api.github.com/users/alexandrugatea')
        .then(data => data.json())
        .then(data => {
            console.timeEnd('fetching data');
            console.log(data);
        });

    // table
    console.table(dogs);
    dogs.forEach(dog => {
        dog.dogAge = dog.age * 7;
    })
    console.table(dogs);
    
    Prism.highlightAll();
})();