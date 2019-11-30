import { Choice } from 'botbuilder-dialogs';
import { Camera } from '../../camera/camera';
import { ActivitySender } from '../core/turnContextWrapper';
import { ChoiceProcessor } from './choiceProcessor';

export class TakePicChoiceProcessor implements ChoiceProcessor {
    constructor(private camera: Camera) { }

    public getChoice(): Choice {
        return {
            synonyms: ['pic'],
            value: 'Take a picture'
        };
    }

    public async processChoice(activitySender: ActivitySender): Promise<boolean> {
        try {
            await this.camera.takePicture();
            return true;
        } catch(e) {
            if (e && e.technicalDetails) {
                console.error(e.technicalDetails);
            }
            const message = (e && e.message) || 'There was an unknown error when trying to take a picture.';
            await activitySender.sendActivity(message);
        }
        return false;
    }
}
