import { hash, verify as verifyHash } from "argon2";
import { prisma, retrieveUser } from "./database";
import { verify as verifyToken, sign as signToken } from "jsonwebtoken";
import { getEnvironmentOptions } from "./environment";
import { User } from "@prisma/client";

const envOptions = getEnvironmentOptions("JWT_SECRET");

export async function hashPassword(secret: string): Promise<string> {
	return await hash(secret);
}

export async function validatePassword(
	user: User | null,
	secret: string
): Promise<boolean> {
	if (!user) return false;
	const encrypted_secret = user.encrypted_secret;
	return await verifyHash(encrypted_secret, secret);
}

export function validateToken(token: string, secret: string): boolean {
	if (!envOptions["JWT_SECRET"]) throw new Error("UndefinedKeyValue");
	return verifyToken(token, envOptions["JWT_SECRET"]);
}

export function mintToken(user: User | null): string {
	if (!user) return "";
	if (!envOptions["JWT_SECRET"]) throw new Error("UndefinedKeyValue");
	return signToken(user, envOptions["JWT_SECRET"], { expiresIn: "5m" });
}
