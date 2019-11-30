import SerialPort = require('serialport');
import { ErrorMessage } from '../bot/core/errorMessage';

export class ArduinoSerial {
    private readonly errorReason: string;

    constructor(public readonly portPath: string, public readonly baudRate: number) {
        this.errorReason = 'This could happen if there is not Arduino connected. Otherwise, ' +
            `confirm that the serial port in use is really '${this.portPath}' and that ` +
            `the baud rate is indeed '${this.baudRate}'.`;
    }

    public write(instructions: string): Promise<void> {
        return instructions ? this.writeCore(instructions) : Promise.resolve();
    }

    private writeCore(instructions: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            let handled = false;

            const handleError = (error: any, message: string): void => {
                if (!handled) {
                    const errorMessage: ErrorMessage = {
                        message: `${message} ${this.errorReason}`,
                        technicalDetails: error && error.message
                    };

                    handled = true;
                    if (reject) {
                        reject(errorMessage);
                    }
                }
            };

            const port = new SerialPort(this.portPath, { baudRate: this.baudRate },
                (error) => handleError(error, 'There was an error while trying to connect to the Arduino.'));

            port.write(instructions, (error: any, bytesWritten: number) => {
                if (error) {
                    handleError(error, 'There was an error while trying to write data to the Arduino.');
                } else if (bytesWritten > 0) {
                    handled = true;
                    if (!handled) {
                        handled = true;
                        if (resolve) {
                            resolve();
                        }
                    }
                }
            });
        });
    }
}
