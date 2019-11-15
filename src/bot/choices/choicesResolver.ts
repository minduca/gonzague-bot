import { Choice } from 'botbuilder-dialogs';
import { ChoiceProcessor } from './choiceProcessor';

export class ChoicesResolver {
    constructor(private processors: ChoiceProcessor[]) { }

    public getChoices(): Choice[] {
        return this.processors.map((processor) => processor.getChoice());
    }

    public getProcessorFor(choiceValue: string): ChoiceProcessor {
        return this.processors.find((processor) => processor.getChoice().value === choiceValue);
    }
}
