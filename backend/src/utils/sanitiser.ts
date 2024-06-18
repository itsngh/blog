function validateUUID(uuid: string): boolean {
	const uuid_regex: RegExp =
		/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
	return uuid_regex.test(uuid);
}

function validateUsername(username: string): boolean {
	const username_regex: RegExp = /^[a-z0-9_.]{3,}$/gi;
	return username_regex.test(username);
}

export function validateID(term: string): string {
	if (validateUUID(term)) return "uuid";
	if (validateUsername(term)) return "username";
	return "none";
}
