import { ActivityHandler, ConversationState, MessageFactory, StatePropertyAccessor, TurnContext, UserState } from 'botbuilder';
import { DialogState } from 'botbuilder-dialogs';
import { MainDialog } from './dialogs/mainDialog';

export class GonzagueBot extends ActivityHandler {
    private dialogState: StatePropertyAccessor<DialogState>;

    constructor(
        private conversationState: ConversationState,
        private userState: UserState,
        private dialog: MainDialog) {

        super();
        if (!this.conversationState) throw new Error('The conversation state is missing.');
        if (!this.userState) throw new Error('The user state is missing.');
        if (!this.dialog) throw new Error('The dialog is missing.');

        this.dialogState = this.conversationState.createProperty<DialogState>('DialogState');

        this.onMessage(async (context, next) => {
            await this.dialog.run(context, this.dialogState);
            await next();
        });
        this.onMembersAdded(async (context, next) => {
            await this.greetNewMember(context);
            await this.dialog.run(context, this.dialogState);
            await next();
        });
        this.onDialog(async (context, next) => {
            await this.conversationState.saveChanges(context, false);
            await this.userState.saveChanges(context, false);
            await next();
        });
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
