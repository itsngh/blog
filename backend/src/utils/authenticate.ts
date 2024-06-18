import { argon2id, hash, verify as verifyHash } from "argon2";
import { prisma, retrieveUserSecret } from "./database";
import {
	verify as verifyToken,
	sign as signToken,
	JwtPayload,
	// JwtPayload,
	// JsonWebTokenError,
	TokenExpiredError,
} from "jsonwebtoken";
import { getEnvironmentOptions } from "./environment";
import { User, Auth } from "@prisma/client";
import log from "./logger";

const envOptions = getEnvironmentOptions("JWT_SECRET", "JWT_REFRESH_SECRET");

export async function hashPassword(secret: string): Promise<string> {
	return await hash(secret);
}

export async function validatePassword(
	auth: Auth,
	secret: string
): Promise<boolean> {
	if (!auth) return false;
	const argon2id_hash = auth.argon2id_hash;
	return await verifyHash(argon2id_hash, secret);
}

export function validateToken(token: string) {
	if (!envOptions["JWT_SECRET"]) throw new Error("UndefinedKeyValue");
	let userPayload: string | JwtPayload | null = null;
	try {
		userPayload = verifyToken(token, envOptions["JWT_SECRET"]);
		return userPayload;
	} catch (err) {
		if (err instanceof TokenExpiredError)
			// TODO: add rotating refresh keys functionality here
			return null;
	}
}

export async function invalidateToken(token: string) {
	if (!envOptions["JWT_SECRET"]) throw new Error("UndefinedKeyValue");
	const userPayload = verifyToken(token, envOptions["JWT_SECRET"]);
}

export function mintToken(user: User): {
	ACCESS_TOKEN?: string;
	REFRESH_TOKEN?: string;
} {
	if (!user)
		return {
			ACCESS_TOKEN: undefined,
			REFRESH_TOKEN: undefined,
		};
	if (!envOptions["JWT_SECRET"] || !envOptions["JWT_REFRESH_SECRET"])
		throw new Error("UndefinedKeyValue");
	const ACCESS_TOKEN = signToken(user, envOptions["JWT_SECRET"], {
		expiresIn: "5m",
	});
	const REFRESH_TOKEN = signToken(user, envOptions["JWT_REFRESH_SECRET"], {
		expiresIn: "1d",
	});
	return {
		ACCESS_TOKEN: ACCESS_TOKEN,
		REFRESH_TOKEN: REFRESH_TOKEN,
	};
}
