const quotes = require('../quotes.json');

module.exports = ({slackClient, logger, config, findQuoteOfTheDay}) => {
    const postMessageParams = {
        channel: config.channelIdWhereToPostQuote,
        text: `${findQuoteOfTheDay(new Date(), quotes)} :squirrel:`
    };

    return slackClient.chat.postMessage(postMessageParams)
        .then(logger.log)
        .catch(logger.error);
};
