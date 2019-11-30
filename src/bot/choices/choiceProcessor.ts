import { Choice } from 'botbuilder-dialogs';
import { ActivitySender } from '../core/turnContextWrapper';

export interface ChoiceProcessor {
    getChoice(): Choice;
    processChoice(activitySender: ActivitySender): Promise<boolean>;
}
