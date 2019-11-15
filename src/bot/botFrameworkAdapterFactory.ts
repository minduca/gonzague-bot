import { BotFrameworkAdapter, BotFrameworkAdapterSettings, BotState, TurnContext } from 'botbuilder';

export class BotFrameworkAdapterFactory {

    constructor(private state: BotState) { }

    public createAdapter(settings?: Partial<BotFrameworkAdapterSettings>): BotFrameworkAdapter {
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
            await this.state.delete(context);
        };

        return adapter;
    }
}
