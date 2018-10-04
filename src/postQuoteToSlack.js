const {compose} = require('folktale/core/lambda');

const buildPostMessageParams = (channelIdWhereToPostQuote, quote) => {
    return {
        channel: channelIdWhereToPostQuote,
        text: `${quote} :squirrel:`
    };
};

const postInSlack = (slackClient, channelIdWhereToPostQuote, quote) => compose(
    slackClient.chat.postMessage,
    buildPostMessageParams.bind(null, channelIdWhereToPostQuote)
)(quote);

module.exports = ({slackClient, logger, config, quotes, findQuoteOfTheDay}) => {
    const {channelIdWhereToPostQuote} = config;

    return findQuoteOfTheDay(new Date(), quotes)
        .chain((quote) => postInSlack(slackClient, channelIdWhereToPostQuote, quote)
            .then(logger.log)
            .catch(logger.error)
        );
};
