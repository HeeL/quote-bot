const dayOfTheYear = currentDate => {
    const date1 = new Date(currentDate.getFullYear(), 0, 1, 12, 0, 0); // noon on Jan. 1
    const date2 = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 12, 0, 0);

    return Math.round((date2 - date1) / 864e5) + 1;
};

module.exports = (currentDate, quotes) => {
    return quotes[(dayOfTheYear(currentDate) - 1) % quotes.length];
};
