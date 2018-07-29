import test from 'ava';
import sinon from 'sinon';
import Maybe from 'folktale/maybe';
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
    const config = {channelIdWhereToPostQuote: '#foobaria-channel'};
    const logger = {log: () => {}};
    const findQuoteOfTheDay = sinon.stub().returns(Maybe.Just('foobar'));
    postQuoteToSlack({slackClient, logger, config, findQuoteOfTheDay});

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
    const findQuoteOfTheDay = () => Maybe.Just('');
    return postQuoteToSlack({slackClient, logger, findQuoteOfTheDay, config: {}})
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
    const findQuoteOfTheDay = () => Maybe.Just('');
    return postQuoteToSlack({slackClient, logger, findQuoteOfTheDay, config: {}})
        .then(() => {
            t.is(logger.error.callCount, 1);
            t.true(logger.error.calledWith('errorzzz'));
        });
});


test('log nothing when no slack message was sent', t => {
    const logger = {
        log: sinon.spy(),
        error: sinon.spy()
    };
    const findQuoteOfTheDay = () => Maybe.Nothing();
    const result = postQuoteToSlack({slackClient: {}, logger, findQuoteOfTheDay, config: {}});

    t.deepEqual(result, Maybe.Nothing());
    t.is(logger.log.callCount, 0);
    t.is(logger.error.callCount, 0);
});
