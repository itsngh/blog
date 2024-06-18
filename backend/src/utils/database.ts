import { PrismaClient, User, Auth, Post } from "@prisma/client";
import log from "./logger";
type retrieveUserOpts = {
	type: string;
	withPosts?: boolean;
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

export async function updatePost(
	post: Post,
	title?: string,
	description?: string,
	content?: string
): Promise<Post | null> {
	if (
		title == post.title &&
		description == post.description &&
		content == post.content
	)
		return post;
	if (!title) return null;
	const updatedPost: Post = await prisma.post.update({
		where: {
			uuid: post.uuid,
		},
		// if both props exist, use the right side of || operator
		data: {
			title: title,
			description: description || post.description,
			content: content || post.content,
		},
	});
	return updatedPost;
}

export async function updateUser(
	user: User,
	username?: string,
	bio?: string
): Promise<User | null> {
	if (username == user.username && bio == user.bio) return user;
	if (!username) return null;
	const updatedUser: User = await prisma.user.update({
		where: {
			uuid: user.uuid,
		},
		data: {
			username: username,
			bio: bio || user.bio,
		},
	});
	return updatedUser;
}
