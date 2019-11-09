import { ActivityHandler, TurnContext } from 'botbuilder';

export class GonzagueBot extends ActivityHandler {
    constructor() {
        super();
        this.onMessage(async (context, next) => {
            await this.handleIncommingMessage(context);
            await next();
        });
        this.onMembersAdded(async (context, next) => {
            await this.greetNewMember(context);
            await next();
        });
    }

    private async handleIncommingMessage(context: TurnContext): Promise<any> {
        // See also https://aka.ms/about-bot-activity-message
        await context.sendActivity(`Echoing '${context.activity.text}'`);
    }

    private async greetNewMember(context: TurnContext): Promise<any> {
        const membersAdded = context.activity.membersAdded;
        for (const member of membersAdded) {
            if (member.id !== context.activity.recipient.id) {
                await context.sendActivity('Hi buddy!');
            }
        }
    }
}
