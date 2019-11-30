
import { StatePropertyAccessor, TurnContext } from 'botbuilder';
import { Choice, ChoicePrompt, ComponentDialog, DialogSet, DialogState, DialogTurnStatus, PromptOptions, WaterfallDialog, WaterfallStepContext } from 'botbuilder-dialogs';
import { ChoiceProcessor } from '../choices/choiceProcessor';
import { ChoicesResolver } from '../choices/choicesResolver';
import { TurnContextWrapper } from '../core/turnContextWrapper';

const MAIN_WATERFALL_DIALOG = 'mainWaterfallDialog';
const CHOICE_PROMPT = 'choicePrompt';

export class MainDialog extends ComponentDialog {
    constructor(private choices: ChoicesResolver) {
        super('mainDialog');

        this.addDialog(new ChoicePrompt(CHOICE_PROMPT));
        this.addDialog(new WaterfallDialog(MAIN_WATERFALL_DIALOG, [
            this.promptChoice.bind(this),
            this.processChoice.bind(this)
        ]));

        this.initialDialogId = MAIN_WATERFALL_DIALOG;
    }

    public async run(context: TurnContext, accessor: StatePropertyAccessor<DialogState>): Promise<any> {
        const dialogSet = new DialogSet(accessor);
        dialogSet.add(this);

        const dialogContext = await dialogSet.createContext(context);
        const results = await dialogContext.continueDialog();
        if (results.status === DialogTurnStatus.empty) {
            await dialogContext.beginDialog(this.id);
        }
    }

    public async processChoice(step: WaterfallStepContext): Promise<any> {
        const chosenProcessor: ChoiceProcessor = this.choices.getProcessorFor(step.result.value);

        const message = await chosenProcessor.processChoice(new TurnContextWrapper(step.context))
        ? 'Done! Let me know if there’s anything else I can do to help you.'
        : 'Sorry for not being helpful. I feel ashamed. Let me know if there’s anything else you want to try.';

        await step.context.sendActivity(message);

        return await step.endDialog();
    }

    private async promptChoice(step: WaterfallStepContext): Promise<any> {
        const options: PromptOptions = {
            choices: this.choices.getChoices(),
            prompt: 'What can I do for you!?',
            retryPrompt: `I'm sorry I can't understand you yet, for I'm yet a bot with very little brain, but very big heart. Is there anything else I can do for you?`
        };
        return await step.prompt(CHOICE_PROMPT, options);
    }
}
