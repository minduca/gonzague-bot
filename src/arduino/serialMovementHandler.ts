import { ArduinoSerial } from './arduinoSerial';
import { MoveInstruction, MovementHandler } from './movementHandler';

export class SerialMovementHandler implements MovementHandler {
    constructor(private serial: ArduinoSerial) { }

    public move(...instructions: MoveInstruction[]): Promise<void> {
        const serialInstructions: string =
            instructions
                .map((instruction) => instruction.direction.charAt(0).toUpperCase() + instruction.distanceOrAngle)
                .join(';');

        return this.serial.write(serialInstructions);
    }
}
