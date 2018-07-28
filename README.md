# quote-bot

Bot takes a quote and post it in slack

## Setup

```
# Install dependencies
npm install

# Run test
npm test

# Run the bot
npm start
```

## Run locally

Rename .env.example to .env and define your SLACK_TOKEN there.  
Slack channel where quotes will be posted can be defined in `src/postQuoteToSlack.js`.  
You can run the bot with `npm start` command.
