import dotenv from "dotenv";
import path from "path";

export function setProductionMode(flag: string) {}

dotenv.config({
	path: path.resolve(__dirname, "..", "..", ".env"),
});

export function getEnvironmentOptions(...options: string[]): {
	BACKEND_PORT?: number;
	JWT_SECRET?: string;
} {
	const requestedEnvOptions: any = {};
	if (options.length <= 0) {
		throw new SyntaxError();
	}
	for (const option in options) {
		if (!process.env[options[option]]) continue;
		requestedEnvOptions[options[option]] = process.env[options[option]];
	}
	return requestedEnvOptions;
}