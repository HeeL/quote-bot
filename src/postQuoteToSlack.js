const buildPostMessageParams = (channelIdWhereToPostQuote, quote) => {
    return {
        channel: channelIdWhereToPostQuote,
        text: `${quote} :squirrel:`
    };
};

const postInSlack = (slackClient, channelIdWhereToPostQuote, quote) => {
    const messageParams = buildPostMessageParams(channelIdWhereToPostQuote, quote);

    return slackClient.chat.postMessage(messageParams);
};

module.exports = ({slackClient, logger, config, quotes, findQuoteOfTheDay}) => {
    const {channelIdWhereToPostQuote} = config;
    const currentDate = new Date();

    return findQuoteOfTheDay(currentDate, quotes)
        .chain((quote) => postInSlack(slackClient, channelIdWhereToPostQuote, quote)
            .then(logger.log)
            .catch(logger.error)
        );
};
