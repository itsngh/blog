import dotenv from "dotenv";
import path from "path";
import log from "./logger";
import { exit } from "process";

// export function setProductionMode(flag: string) {}

type environmentVariablesType = {
	BACKEND_PORT: number;
	LOG_LEVEL: number;
	NODE_ENV: string;
	REDIS_ADDR: string;
	REDIS_PORT: number;
	REDIS_USERNAME: string;
	REDIS_SECRET: string;
};

dotenv.config({
	path: path.resolve(__dirname, "..", "..", "..", ".env"),
});

const getEnvironmentVariables = (): environmentVariablesType => {
	if (
		!process.env.BACKEND_PORT ||
		!process.env.LOG_LEVEL ||
		!process.env.NODE_ENV ||
		!process.env.REDIS_ADDR ||
		!process.env.REDIS_PORT ||
		!process.env.REDIS_USERNAME ||
		!process.env.REDIS_SECRET
	) {
		log(`MISSING KEY DETECTED !!!!`, 1);
		exit(1);
	}
	return {
		BACKEND_PORT: parseInt(process.env.BACKEND_PORT),
		LOG_LEVEL: parseInt(process.env.LOG_LEVEL),
		NODE_ENV: process.env.NODE_ENV,
		REDIS_ADDR: process.env.REDIS_ADDR,
		REDIS_PORT: parseInt(process.env.REDIS_PORT),
		REDIS_USERNAME: process.env.REDIS_USERNAME,
		REDIS_SECRET: process.env.REDIS_SECRET,
	};
};

const environmentVariables = getEnvironmentVariables();

export default environmentVariables;
