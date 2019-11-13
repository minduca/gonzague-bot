import * as restify from 'restify';
import { GonzagueBot } from './gonzagueBot';
import { configDotenv } from './dotenvLoader';
import { BotFrameworkAdapterFactory } from './botFrameworkAdapterFactory';
import { MemoryStorage, ConversationState, UserState } from 'botbuilder';

configDotenv();

const memoryStorage = new MemoryStorage();
const conversationState = new ConversationState(memoryStorage);
const userState = new UserState(memoryStorage);
const bot = new GonzagueBot(conversationState, userState);

const adapter = new BotFrameworkAdapterFactory(conversationState).createAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

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