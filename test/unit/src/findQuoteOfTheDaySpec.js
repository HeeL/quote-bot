import test from 'ava';
import findQuoteOfTheDay from '../../../src/findQuoteOfTheDay';

test('return undefined if empty list provided', t => {
    const quotes = [];
    const quote = findQuoteOfTheDay(new Date(), quotes);

    t.is(quote, undefined);
});

test('return quote if its the only one', t => {
    const quotes = ['foo'];
    const quote = findQuoteOfTheDay(new Date(), quotes);

    t.is(quote, 'foo');
});

test('return the second quote from the list on the second day of the year', t => {
    const quotes = ['foo', 'bar'];
    const quote = findQuoteOfTheDay(new Date('2018-01-02'), quotes);

    t.is(quote, 'bar');
});

test('return the 32nd quote on the first of february', t => {
    const quotes = Array.from({length: 33}, (_, i) => `Quote #${(i + 1).toString()}`);
    const quote = findQuoteOfTheDay(new Date('2018-02-01'), quotes);

    t.is(quote, 'Quote #32');
});

test('return 4th quote on 12th of January if list of quotes has 8 items', t => {
    const quotes = Array.from({length: 8}, (_, i) => `Quote #${(i + 1).toString()}`);
    const quote = findQuoteOfTheDay(new Date('2018-01-12'), quotes);

    t.is(quote, 'Quote #4');
});
