import test from 'ava';
import sinon from 'sinon';
import postQuoteToSlack from '../../../src/postQuoteToSlack';

test('post one quote to slack', t => {
    const postMessage = sinon.stub().resolves();
    const slackClient = {
        chat: {postMessage}
    };
    const expectedPostMessage = {
        channel: '#foobaria-channel',
        text: 'foobar :squirrel:'
    };
    const quotes = ['foobar'];
    const config = {channelIdWhereToPostQuote: '#foobaria-channel'};
    const logger = {log: () => {}};
    postQuoteToSlack({slackClient, logger, config, quotes});

    t.is(postMessage.callCount, 1);
    t.true(postMessage.calledWith(expectedPostMessage));
});

test('log success after message sent', t => {
    const slackClient = {
        chat: {postMessage: () => Promise.resolve('foo bar')}
    };
    const logger = {
        log: sinon.spy()
    };
    return postQuoteToSlack({slackClient, logger, config: {}, quotes: ['']})
        .then(() => {
            t.is(logger.log.callCount, 1);
            t.true(logger.log.calledWith('foo bar'));
        });
});


test('log error after failed to send a message', t => {
    const slackClient = {
        chat: {postMessage: () => Promise.reject('errorzzz')}
    };
    const logger = {
        log: () => {},
        error: sinon.spy()
    };
    return postQuoteToSlack({slackClient, logger, config: {}, quotes: ['']})
        .then(() => {
            t.is(logger.error.callCount, 1);
            t.true(logger.error.calledWith('errorzzz'));
        });
});
