import test from 'ava';
import sinon from 'sinon';
import postQuoteToSlack from '../../../src/postQuoteToSlack';

test('post one quote to slack', t => {
    const postMessage = sinon.spy();
    const slack = {
        chat: {postMessage}
    };
    const expectedPostMessage = {
        channel: '#somechannel',
        text: 'foobar :squirell:'
    };
    postQuoteToSlack(slack, ['foobar']);

    t.is(postMessage.callCount, 1);
    t.true(postMessage.calledWith(expectedPostMessage));
});
