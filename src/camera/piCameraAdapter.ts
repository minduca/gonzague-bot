import * as RaspiCam from 'raspicam';
import { FileNameGenerator } from '../core/fileNameGenerator';
import { Camera, TakePictureOptions } from './camera';

export class PiCameraAdapter implements Camera {

    constructor(private outputPath: string) { }

    public async takePicture(options: TakePictureOptions): Promise<void> {
        if (!options) throw new Error('The take picture options is missing.');

        const piOptions = this.toPiPictureOptions(options);
        const raspistill = new RaspiCam(piOptions);

        raspistill.on('start', () => {
            raspistill.child_process.on('error', async (error) => {
                console.error(error);
                const message = 'There was an error trying to take a picture using the raspstill library. ' +
                'Make sure this code is running on a raspberry PI, that the camera is plugged in and that it '+ 
                'is also properly activated on raspi-config';
                console.error(message);
                await options.notify(message);
            });
        });

        raspistill.start();
    }

    private toPiPictureOptions(options: TakePictureOptions) {
        let piOptions = {
            log: options && options.notify,
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
            h: 768,
            q: 50,
            w: 1024
        };
    }
}
