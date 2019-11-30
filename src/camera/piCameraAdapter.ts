import * as RaspiCam from 'raspicam';
import { ErrorMessage } from '../bot/core/errorMessage';
import { FileNameGenerator } from '../core/fileNameGenerator';
import { Camera, TakePictureOptions } from './camera';

export class PiCameraAdapter implements Camera {

    constructor(private outputPath: string) { }

    public async takePicture(options?: TakePictureOptions): Promise<void> {
        const piOptions = this.toPiPictureOptions(options);
        const raspistill = new RaspiCam(piOptions);

        return new Promise((resolve, reject) => {
            let handled = false;
            raspistill.on('start', () => {
                // on initialization error
                raspistill.child_process.on('error', (error: any) => {
                    handled = true;
                    const errorMessage: ErrorMessage = {
                        message: 'There was an error while trying to take a picture using raspistill. ' +
                            'This could happen if you are not running the bot on a Raspberry PI. Otherwise, ' +
                            'confirm that the camera is connected and enabled on the OS.',
                        technicalDetails: error
                    };
                    if (reject) {
                        reject(errorMessage);
                    }
                });
            });

            // on timeout
            raspistill.on('exit', () => {
                if (!handled) {
                    handled = true;
                    if (reject) {
                        reject(
                            'Raspistill timed out while trying to take a picture. If the error persists, ' +
                            'set a higher timeout on the code and try again.'
                        );
                    }
                }
            });

            // on success
            raspistill.on('stop', () => {
                if (!handled) {
                    handled = true;
                    if (resolve) {
                        resolve();
                    }
                }
            });

            raspistill.start();
        });
    }

    private toPiPictureOptions(options?: TakePictureOptions) {
        let piOptions = {
            mode: 'photo',
            output: FileNameGenerator.createNameFromTimestamp('pic', 'jpg', this.outputPath)
        };

        if (options && options.lowResolution) {
            piOptions = { ...piOptions, ...this.withLowResolutionOptions() };
        }

        return piOptions;
    }

    private withLowResolutionOptions() {
        return {
            height: 768,
            quality: 50,
            timeout: 15000,
            width: 1024
        };
    }
}
