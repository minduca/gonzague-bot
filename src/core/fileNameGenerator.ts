import * as path from 'path';

export class FileNameGenerator {
    public static createNameFromTimestamp(fileName: string, fileExtension: string, filePath: string) {
        if (!fileName) throw new Error('The file name is missing.');
        if (!fileExtension) throw new Error('The file extension is missing.');
        if (!filePath) throw new Error('The file path is missing.');

        const now = new Date();
        const file = `${fileName}-${now.getFullYear()}-${now.getMonth()}-${now.getDate()}-${now.getTime()}.${fileExtension}`;
        return path.join(filePath, file);
    }
}
