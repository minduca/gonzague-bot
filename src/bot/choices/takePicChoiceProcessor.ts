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

    public async processChoice(activitySender: ActivitySender): Promise<any> {
        await this.camera.takePicture({
            notify: async (text: string) => {
                await activitySender.sendActivity(text);
            }
        });
    }
}
