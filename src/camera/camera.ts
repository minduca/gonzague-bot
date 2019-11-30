
export interface Camera {
    takePicture(options?: TakePictureOptions): Promise<void>;
}

export interface TakePictureOptions {
    lowResolution?: boolean;
}
