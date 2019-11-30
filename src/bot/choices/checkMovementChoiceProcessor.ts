import { Choice } from 'botbuilder-dialogs';
import { MovementHandler } from '../../arduino/movementHandler';
import { ActivitySender } from '../core/turnContextWrapper';
import { BasicChoiceProcessor } from './choiceProcessor';

export class CheckMovementChoiceProcessor extends BasicChoiceProcessor {
    constructor(private movement: MovementHandler) {
        super();
    }

    public getChoice(): Choice {
        return {
            synonyms: ['dance', 'move'],
            value: 'Check basic movements'
        };
    }
    public async processChoice(activitySender: ActivitySender): Promise<boolean> {
        return this.handleResult(activitySender, this.movement.move(
            { direction: 'forward', distanceOrAngle: 10 },
            { direction: 'backward', distanceOrAngle: 10 },
            { direction: 'left', distanceOrAngle: 45 },
            { direction: 'right', distanceOrAngle: 45 }
        ));
    }
}
