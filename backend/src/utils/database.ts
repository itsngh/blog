import { PrismaClient, User, Auth, Post } from "@prisma/client";
import { validateID } from "./sanitiser";
type retrieveUserOpts = {
	type: string;
	withPosts?: boolean;
	withAuth?: boolean;
};

export const prisma = new PrismaClient();

export async function retrieveUser(
	term: string,
	options: retrieveUserOpts
): Promise<User | null> {
	switch (options.type) {
		case "uuid":
			return await prisma.user.findUnique({
				where: {
					uuid: term,
				},
				include: {
					posts: options.withPosts,
				},
			});
		case "username":
			return await prisma.user.findUnique({
				where: {
					username: term,
				},
				include: {
					posts: options.withPosts,
				},
			});
		default:
			return null;
	}
}

export async function retrieveUserSecret(
	term: string,
	options: retrieveUserOpts
): Promise<Auth | null> {
	switch (options.type) {
		case "uuid":
			return await prisma.auth.findUnique({
				where: {
					uuid: term,
				},
			});
		case "username":
			return await prisma.auth.findUnique({
				where: {
					username: term,
				},
			});
		default:
			return null;
	}
}
// export async function retrieveUserWithSecret(
// 	term: string,
// 	type: string
// ): Promise<User | null> {
// 	let user = null;
// 	switch (type) {
// 		case "uuid":
// 			user = await prisma.user.findUnique({
// 				where: { uuid: term },
// 			});
// 			break;
// 		case "username":
// 			user = await prisma.user.findUnique({
// 				where: { username: term },
// 			});
// 			break;
// 		default:
// 			throw new SyntaxError();
// 	}
// 	return user;
// }

export async function retrievePost(uuid: string): Promise<Post | null> {
	return await prisma.post.findUnique({
		where: {
			uuid: uuid,
		},
	});
}

export async function addPost(
	title: string,
	author: User,
	description?: string,
	content?: string
): Promise<Post> {
	const post: Post = await prisma.post.create({
		data: {
			title: title,
			description: description,
			content: content,
			author_uuid: author.uuid,
		},
	});
	return post;
}

export async function addUser(
	username: string,
	encrypted_secret: string
): Promise<User> {
	const user: User = await prisma.user.create({
		data: {
			username: username,
			auth: {
				create: {
					argon2id_hash: encrypted_secret,
				},
			},
		},
	});
	return user;
}

// export async function updatePost(post: Post, data: {}): Promise<Post> {}

// export async function updateUser(user: User): Promise<User> {}
