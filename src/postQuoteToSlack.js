const CHANNEL_ID_WHERE_TO_POST_QUOTE = '#somechannel';

module.exports = ({slackClient, quotes}) => {
    const postMessageParams = {
        channel: CHANNEL_ID_WHERE_TO_POST_QUOTE,
        text: `${quotes[0]} :squirell:`
    };

    slackClient.chat.postMessage(postMessageParams)
        .then(console.log)
        .catch(console.error);
};
