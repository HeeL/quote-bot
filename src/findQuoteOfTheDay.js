const Maybe = require('folktale/maybe');

const dayOfTheYear = currentDate => {
    const januaryFirstThisYear = new Date(`${currentDate.getFullYear()}-01-01`);

    return Math.round((currentDate - januaryFirstThisYear) / 864e5) + 1;
};

module.exports = (currentDate, quotes) => {
    const quoteOfTheDayIndex = (dayOfTheYear(currentDate) - 1) % quotes.length;

    return Maybe.fromNullable(quotes[quoteOfTheDayIndex]);
};
