module.exports = ({slackClient, config, quotes}) => {
    const postMessageParams = {
        channel: config.channelIdWhereToPostQuote,
        text: `${quotes[0]} :squirrel:`
    };

    slackClient.chat.postMessage(postMessageParams)
        .then(console.log)
        .catch(console.error);
};
