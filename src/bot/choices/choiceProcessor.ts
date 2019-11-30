import { Choice } from 'botbuilder-dialogs';
import { ErrorMessage } from '../core/errorMessage';
import { ActivitySender } from '../core/turnContextWrapper';

export interface ChoiceProcessor {
    getChoice(): Choice;
    processChoice(activitySender: ActivitySender): Promise<boolean>;
}

export abstract class BasicChoiceProcessor implements ChoiceProcessor {
    public abstract getChoice(): Choice;

    public abstract processChoice(activitySender: ActivitySender): Promise<boolean>;

    public handleResult(activitySender: ActivitySender, result: Promise<void>): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            result
                .then(() => resolve(true))
                .catch((error: ErrorMessage) => {
                    if (error && error.technicalDetails) {
                        console.error(error.technicalDetails);
                    }
                    const message = (error && error.message) || 'There was an unknown error when trying to take a picture.';
                    activitySender.sendActivity(message).finally(() => resolve(false));
                });
        });
    }
}
