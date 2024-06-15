import { PrismaClient, User } from "@prisma/client";

export const prisma = new PrismaClient();

export async function retrieveUsers(): Promise<User[]> {
	const users = await prisma.user.findMany({
		include: { posts: true },
	});
	return users;
}

export async function retrieveUser(term: string): Promise<User | null> {
	// term could be username or uuid
	let user: any;
	if (term.includes("-")) {
		user = await prisma.user.findUnique({
			where: {
				uuid: term,
			},
		});
	} else {
		user = await prisma.user.findUnique({
			where: {
				username: term,
			},
		});
	}
	return user;
}
