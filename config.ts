import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "./.env") });

interface ENV {
    NODE_ENV?: string;
    PORT: number | null;
    API_URL?: string;
    HOST?: string;
}

interface Config {
    NODE_ENV: string;
    PORT: number;
    API_URL: string;
    HOST: string;
}

const getConfig = (): ENV => {
    return {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT ? Number(process.env.PORT) : 4000,
        API_URL: 'api',
        HOST: process.env.HOST || "localhost"
    };
};


const getSanitizedConfig = (config: ENV): Config => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }
    return config as Config;
};

const config = getConfig();

const verifiedConfig = getSanitizedConfig(config);

export default verifiedConfig;
