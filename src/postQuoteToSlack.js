const CHANNEL_ID_WHERE_TO_POST_QUOTE = '#somechannel';

module.exports = (slack, quotes) => {
    const postMessage = {
        channel: CHANNEL_ID_WHERE_TO_POST_QUOTE,
        text: `${quotes[0]} :squirell:`
    };
    slack.chat.postMessage(postMessage);
};
