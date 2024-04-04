(function () {
    console.clear();

    // ## Array Cardio Day 2

    const people = [
        { name: 'Wes', year: 1988 },
        { name: 'Kait', year: 1986 },
        { name: 'Irv', year: 1970 },
        { name: 'Lux', year: 2015 }
    ];

    const comments = [
        { text: 'Love this!', id: 523423 },
        { text: 'Super good', id: 823423 },
        { text: 'You are the best', id: 2039842 },
        { text: 'Ramen is my fav food ever', id: 123523 },
        { text: 'Nice Nice Nice!', id: 542328 }
    ];

    // Some and Every Checks
    // Array.prototype.some() // is at least one person 19 or older?
    // Array.prototype.every() // is everyone 19 or older?
    const currentYear = (new Date()).getFullYear();
    let some = '';
    let every = '';
    const isAdult = people.some(person => (currentYear - person.year >= 18) ? some = 'There is at least an Adult in the list.' : some = 'There is no adult in the list.');
    const allAdult = people.every(person => (currentYear - person.year >= 18) ? every = 'Every person is an adult.' : every = 'Not all people are adults.');
    console.log(some, every)

    // Array.prototype.find()
    // Find is like filter, but instead returns just the one you are looking for
    // find the comment with the ID of 823423
    const comment = comments.find(comment => comment.id === 823423);
    // console.log(comment);
    console.log(comment.text);

    // Array.prototype.findIndex()
    // Find the comment with this ID
    // delete the comment with the ID of 823423
    const index = comments.findIndex(comment => comment.id === 823423);
    // delete method .slice()
    const newComments = [
        ...comments.slice(0, index), // ... will spread the items, instead of returning array inside array
        ...comments.slice(index + 1),
    ]
    console.log(newComments);

    // delete method .splice()
    comments.splice(index, 1);
    console.table(comments);

    Prism.highlightAll();

})();