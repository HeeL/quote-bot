import test from 'ava';
import sinon from 'sinon';
import postQuoteToSlack from '../../../src/postQuoteToSlack';

test('post one quote to slack', t => {
    const postMessage = sinon.stub().resolves();
    const slackClient = {
        chat: {postMessage}
    };
    const expectedPostMessage = {
        channel: '#somechannel',
        text: 'foobar :squirrel:'
    };
    const quotes = ['foobar'];
    postQuoteToSlack({slackClient, quotes});

    t.is(postMessage.callCount, 1);
    t.true(postMessage.calledWith(expectedPostMessage));
});
