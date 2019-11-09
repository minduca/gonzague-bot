import * as restify from 'restify';
import { GonzagueBot } from './bot';
import { configDotenv } from './dotenvLoader';
import { BotFrameworkAdapterFactory } from './botFrameworkAdapterFactory';

configDotenv();

const adapter = new BotFrameworkAdapterFactory().createAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

const bot = new GonzagueBot();

const port = process.env.port || process.env.PORT || 3978;

const server = restify.createServer({
    name: 'Gonzague Server'
});
server.listen(port, () => {
    console.log(`\n${server.name} listening to ${server.url}`);
});

// Listen for incoming requests.
server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        // Route to main dialog.
        await bot.run(context);
    });
});