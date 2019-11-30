export type Direction = 'forward' | 'backward' | 'left' | 'right';

export interface MoveInstruction {
    direction: Direction;
    /**
     * Distance in cm. Angle in degrees.
     */
    distanceOrAngle: number;
}

export interface MovementHandler {
    move(...instructions: MoveInstruction[]): Promise<void>;
}
