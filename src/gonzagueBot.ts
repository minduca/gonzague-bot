import { ActivityHandler, TurnContext, UserState, ConversationState, MessageFactory } from 'botbuilder';

const ACTION_FIND_CAT = "Find my cat";

export class GonzagueBot extends ActivityHandler {
    constructor(
        private conversationState: ConversationState,
        private userState: UserState) {

        super();
        if (!this.conversationState) throw new Error('The conversation state is missing.');
        if (!this.userState) throw new Error('The user state is missing.');

        this.onMessage(async (context, next) => {
            await this.handleIncommingMessage(context);
            await next();
        });
        this.onMembersAdded(async (context, next) => {
            await this.greetNewMember(context);
            await next();
        });
        this.onDialog(async (context, next) => {
            // Save any state changes. The load happened during the execution of the Dialog.
            await this.conversationState.saveChanges(context, false);
            await this.userState.saveChanges(context, false);
            await next();
        });
    }

    private async handleIncommingMessage(context: TurnContext): Promise<any> {
        const text = context.activity.text.toLowerCase();
        if (text == ACTION_FIND_CAT.toLowerCase()) {
            context.sendActivity('// TODO');
        }
        else if (text == "quit") {
            await context.sendActivity('Alright. Bye!');
            process.exit();
        } else {
            await context.sendActivity(`I'm sorry I can't understand you yet, for I'm yet a bot with very little brain, but very big heart.`);
            await this.sendSuggestedActions(context, 'Is there anything else I can do for you?');
        }
    }

    private async greetNewMember(context: TurnContext): Promise<any> {
        const membersAdded = context.activity.membersAdded;
        for (const member of membersAdded) {
            if (member.id !== context.activity.recipient.id) {
                await this.sendSuggestedActions(context, 'Hi buddy, What can I do for you!?');
            }
        }
    }

    private async sendSuggestedActions(context: TurnContext, message: string): Promise<any> {
        var reply = MessageFactory.suggestedActions([ACTION_FIND_CAT], message);
        await context.sendActivity(reply);
    }
}
