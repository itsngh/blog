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

export function validateToken(
	access_token: string,
	refresh_token: string,
	user: User
) {
	if (!envOptions["JWT_SECRET"] || !envOptions["JWT_REFRESH_SECRET"])
		throw new Error("UndefinedKeyValue");
	let userPayload = null;
	try {
		userPayload = verifyToken(access_token, envOptions["JWT_SECRET"], {
			algorithms: ["HS512"],
		});
		return userPayload;
	} catch (err) {
		if (err instanceof TokenExpiredError) {
			try {
				if (
					verifyToken(
						refresh_token,
						envOptions["JWT_REFRESH_SECRET"],
						{
							algorithms: ["HS512"],
						}
					)
				)
					return mintToken(user);
			} catch (err) {
				return null;
			}
		}
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
		algorithm: "HS512",
	});
	const REFRESH_TOKEN = signToken(user, envOptions["JWT_REFRESH_SECRET"], {
		expiresIn: "1d",
		algorithm: "HS512",
	});
	return {
		ACCESS_TOKEN: ACCESS_TOKEN,
		REFRESH_TOKEN: REFRESH_TOKEN,
	};
}
