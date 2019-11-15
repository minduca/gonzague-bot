import { Choice } from 'botbuilder-dialogs';
import { ActivitySender } from '../core/turnContextWrapper';
import { ChoiceProcessor } from './choiceProcessor';

export class TakePicChoiceProcessor implements ChoiceProcessor {
    public getChoice(): Choice {
        return {
            synonyms: ['pic'],
            value: 'Take a picture'
        };
    }

    public processChoice(activitySender: ActivitySender): void {
        activitySender.sendActivity('// TODO');
    }

}
