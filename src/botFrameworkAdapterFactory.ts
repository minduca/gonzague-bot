import { BotFrameworkAdapter, TurnContext, BotFrameworkAdapterSettings } from "botbuilder";

export class BotFrameworkAdapterFactory {
    createAdapter(settings?: Partial<BotFrameworkAdapterSettings>): BotFrameworkAdapter {
        const adapter = new BotFrameworkAdapter(settings);
        adapter.onTurnError = async (context: TurnContext, error: Error) => {
            console.error(`\n Unhandled onTurn error: ${error}`);
        
            await context.sendTraceActivity(
                'OnTurnError Trace',
                `${error}`,
                'https://www.botframework.com/schemas/error',
                'TurnError'
            );
        
            await context.sendActivity('The bot encounted an error.');
        };

        return adapter;
    }
}