import { PrismaClient, User, Post } from "@prisma/client";

export const prisma = new PrismaClient();

export async function retrieveUsers(): Promise<User[]> {
	const users = await prisma.user.findMany({
		include: { posts: true },
	});
	return users;
}

export async function retrieveUser(
	term: string,
	withPosts: boolean
): Promise<User | null> {
	// term could be username or uuid
	let user: User | null = null;
	if (term.includes("-") && term.length == 12) {
		// term is uuid
		user = await prisma.user.findUnique({
			where: { uuid: term },
			include: { posts: withPosts },
		});
	} else {
		// term is username
		user = await prisma.user.findUnique({
			where: { username: term },
			include: { posts: withPosts },
		});
	}
	return user;
}

export async function retrievePost(uuid: string): Promise<Post | null> {
	return await prisma.post.findUnique({
		where: {
			uuid: uuid,
		},
	});
}

export async function addPost(
	title: string,
	description?: string,
	content?: string
) {}

export async function addUser(
	username: string,
	encrypted_secret: string
): Promise<User> {
	const user: User = await prisma.user.create({
		data: {
			username: username,
			encrypted_secret: encrypted_secret,
		},
	});
	return user;
}

export async function updatePost() {}

export async function updateUser() {}
