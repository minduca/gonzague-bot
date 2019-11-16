
export interface Camera {
    takePicture(options?: TakePictureOptions): Promise<void>;
}

export interface TakePictureOptions {
    notify: (text: string) => Promise<void>;
    lowResolution?: boolean;
}
