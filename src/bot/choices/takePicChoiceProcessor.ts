import { Choice } from 'botbuilder-dialogs';
import { Camera } from '../../camera/camera';
import { ActivitySender } from '../core/turnContextWrapper';
import { BasicChoiceProcessor } from './choiceProcessor';

export class TakePicChoiceProcessor extends BasicChoiceProcessor {
    constructor(private camera: Camera) {
        super();
    }

    public getChoice(): Choice {
        return {
            synonyms: ['pic', 'picture', 'snapshot', 'photo'],
            value: 'Take a picture'
        };
    }

    public processChoice(activitySender: ActivitySender): Promise<boolean> {
        return this.handleResult(activitySender, this.camera.takePicture());
    }
}
