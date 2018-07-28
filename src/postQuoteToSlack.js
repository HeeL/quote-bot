module.exports = ({slackClient, logger, config, quotes}) => {
    const postMessageParams = {
        channel: config.channelIdWhereToPostQuote,
        text: `${quotes[0]} :squirrel:`
    };

    return slackClient.chat.postMessage(postMessageParams)
        .then(logger.log)
        .catch(logger.error);
};
