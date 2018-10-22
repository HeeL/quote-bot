import test from 'ava';
import Maybe from 'folktale/maybe';
import findQuoteOfTheDay from '../../../src/findQuoteOfTheDay';

const generateQuotes = (amount = 99) => Array.from({length: amount}, (_, i) => `Quote #${(i + 1).toString()}`);

test('return Nothing if empty list provided', t => {
    const quotes = [];
    const quote = findQuoteOfTheDay(new Date(), quotes);

    t.deepEqual(quote, Maybe.Nothing());
});

test('return quote if its the only one', t => {
    const quotes = ['foo'];
    const quote = findQuoteOfTheDay(new Date(), quotes);

    t.deepEqual(quote, Maybe.Just('foo'));
});

test('return the second quote from the list on the second day of the year', t => {
    const quotes = ['foo', 'bar'];
    const quote = findQuoteOfTheDay(new Date('2018-01-02'), quotes);

    t.deepEqual(quote, Maybe.Just('bar'));
});

test('should take a quote based on day of the year', t => {
    const the32ndDayOfTheYear = new Date('2018-02-01');
    const quote = findQuoteOfTheDay(the32ndDayOfTheYear, generateQuotes());

    t.deepEqual(quote, Maybe.Just('Quote #32'));
});

test('when current day is bigger than amount of quotes it should start from the beginning', t => {
    const the12thDayOfTheYear = new Date('2018-01-12');
    const quote = findQuoteOfTheDay(the12thDayOfTheYear, generateQuotes(8));

    t.deepEqual(quote, Maybe.Just('Quote #4'));
});
