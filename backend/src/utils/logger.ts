import { getEnvironmentOptions } from "./environment";

const envOptions = getEnvironmentOptions("LOG_LEVEL");

/**
 * @description Output a message based on logging level. 0: none, 1-5: fatal, error, warning, info, debug
 * @param {string} message - desired message to log
 * @param {number} log_level - the log level of the desired message
 */
export default function log(message: string, log_level: number) {
	if (!envOptions["LOG_LEVEL"]) throw new Error("UndefinedKeyValue");
	if (
		envOptions["LOG_LEVEL"] < 0 ||
		envOptions["LOG_LEVEL"] > 5 ||
		log_level < 0 ||
		log_level > 5
	)
		throw new RangeError();
	if (log_level <= envOptions["LOG_LEVEL"]) {
		console.log(`${colorCodedLogPrefixes[log_level]} ${message}\x1b[0m`);
	}
}

const colorCodedLogPrefixes: any = {
	1: "\x1b[1m\x1b[41m\x1b[30m[FATAL]", // bright red
	2: "\x1b[2m\x1b[41m\x1b[30m[ERROR]", // dim red
	3: "\x1b[1m\x1b[43m\x1b[30m[WARN]", // bright yellow
	4: "\x1b[1m\x1b[47m\x1b[30m[INFO]", // bright white
	5: "\x1b[1m\x1b[46m\x1b[30m[DEBUG]", // bright cyan
};
