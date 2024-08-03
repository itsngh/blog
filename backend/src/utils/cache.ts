import { createClient } from "redis";
import log from "./logger";
import * as crypto from "crypto";
import { Session } from "@prisma/client";
import environmentVariables from "./environment";
import { exit } from "process";

const redis = createClient({
	username: environmentVariables.REDIS_USERNAME,
	password: environmentVariables.REDIS_SECRET,
	socket: {
		host: environmentVariables.REDIS_ADDR,
		port: environmentVariables.REDIS_PORT,
	},
});
redis.on("error", (err: Error) => {
	log(`Redis: ${err}`, 1);
	exit(1);
});
redis.on("ready", () => {
	log(`Redis Client has connected!`, 4);
});
await redis.connect();

export async function createSession(uuid: string) {
	const session = crypto.randomBytes(64).toString("hex");
	const current_timestamp = new Date(
		Date.now() + 6 * 1000 * 60 * 60
	).getTime();
	try {
		await redis.hSet(session, {
			session: session,
			user_uuid: uuid,
			expiresAt: current_timestamp,
		});
	} catch (err) {
		log(`${err}`, 2);
		return null;
	}
	return session;
}

export async function retrieveSession(session: string) {
	let sessionObject = null;
	try {
		sessionObject = await redis.hGetAll(session);
	} catch (err) {
		log(`${err}`, 2);
		return null;
	}
	return sessionObject;
}
export async function wipeSession(session: string): Promise<boolean> {
	log(session, 5);
	try {
		await redis.del(session);
	} catch (err) {
		log(`${err}`, 2);
		return false;
	}
	return true;
}

export default redis;
