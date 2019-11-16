import { ConversationState, MemoryStorage, UserState } from 'botbuilder';
import { config } from 'dotenv';
import * as path from 'path';
import * as restify from 'restify';
import { BotFrameworkAdapterFactory } from './bot/botFrameworkAdapterFactory';
import { ChoicesResolver } from './bot/choices/choicesResolver';
import { TakePicChoiceProcessor } from './bot/choices/takePicChoiceProcessor';
import { MainDialog } from './bot/dialogs/mainDialog';
import { GonzagueBot } from './bot/gonzagueBot';
import { PiCameraAdapter } from './camera/piCameraAdapter';

const rootDirectory = path.join(__dirname, '..');

config({ path: path.join(rootDirectory, '.env') });

const choices = new ChoicesResolver([
    new TakePicChoiceProcessor(new PiCameraAdapter(path.join(rootDirectory, 'output_files')))
]);

const memoryStorage = new MemoryStorage();
const conversationState = new ConversationState(memoryStorage);
const userState = new UserState(memoryStorage);
const dialog = new MainDialog(choices);
const bot = new GonzagueBot(conversationState, userState, dialog);

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
