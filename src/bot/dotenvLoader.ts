import { config } from 'dotenv';
import * as path from 'path';

export const configDotenv = () => {
    const ENV_FILE = path.join(__dirname, '..', '.env');
    config({ path: ENV_FILE });
};
