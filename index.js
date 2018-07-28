const Slack = require('slack');
const postQuoteToSlack = require('./src/postQuoteToSlack');
const quotes = require('./quotes.json');
const dotenv = require('dotenv');

dotenv.config();

postQuoteToSlack({
    slackClient: new Slack({token: process.env.SLACK_TOKEN}),
    config: {
        channelIdWhereToPostQuote: process.env.CHANNEL_ID_WHERE_TO_POST_QUOTE
    },
    quotes
});
