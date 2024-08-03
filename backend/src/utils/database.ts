import { PrismaClient, User, Session, Post } from "@prisma/client";
// import environmentVariables from "./environment";
import { validateID } from "./sanitiser";

const prismaClientSingleton = () => {
	return new PrismaClient();
};
declare global {
	var prisma: PrismaClient;
}
global.prisma = globalThis.prisma ?? prismaClientSingleton();
export default global.prisma;

export async function retrieveUser(term: string): Promise<User | null> {
	let user = null;
	switch (validateID(term)) {
		case "username":
			user = prisma.user.findUnique({ where: { username: term } });
			break;
		case "uuid":
			user = prisma.user.findUnique({ where: { uuid: term } });
			break;
	}
	return user;
}
