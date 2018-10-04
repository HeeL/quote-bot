const Slack = require('slack');
const postQuoteToSlack = require('./src/postQuoteToSlack');
const findQuoteOfTheDay = require('./src/findQuoteOfTheDay');
const dotenv = require('dotenv');
dotenv.config();
const quotes = require(`./src/quotes/${process.env.JSON_FILENAME_WITH_QUOTES}.json`);

postQuoteToSlack({
    slackClient: new Slack({token: process.env.SLACK_TOKEN}),
    logger: {
        log: console.log,
        error: console.error
    },
    findQuoteOfTheDay,
    quotes,
    config: {
        channelIdWhereToPostQuote: process.env.CHANNEL_ID_WHERE_TO_POST_QUOTE
    }
});
