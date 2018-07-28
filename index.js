const Slack = require('slack');
const postQuoteToSlack = require('./src/postQuoteToSlack');
const findQuoteOfTheDay = require('./src/findQuoteOfTheDay');
const dotenv = require('dotenv');

dotenv.config();

postQuoteToSlack({
    slackClient: new Slack({token: process.env.SLACK_TOKEN}),
    logger: {
        log: console.log,
        error: console.error
    },
    findQuoteOfTheDay,
    config: {
        channelIdWhereToPostQuote: process.env.CHANNEL_ID_WHERE_TO_POST_QUOTE
    }
});
