const Maybe = require('folktale/maybe');

const getDayOfTheYear = currentDate => {
    const firstDayOfTheYear = new Date(`${currentDate.getFullYear()}-01-01`);

    return Math.round((currentDate - firstDayOfTheYear) / 864e5) + 1;
};

module.exports = (currentDate, quotes) => {
    const quoteOfTheDayIndex = (getDayOfTheYear(currentDate) - 1) % quotes.length;

    return Maybe.fromNullable(quotes[quoteOfTheDayIndex]);
};
