import "./Post.css";

export type PostProps = {
	title: string;
	content: string;
	date: Date;
	id: string;
};

function terminateString(string: string, upToLength: number): string {
	if (string.length > upToLength) {
		return `${string.slice(0, upToLength)}...`;
	}
	return string;
}

export function Post({ title, content, date, id }: PostProps) {
	const shortenedContent = terminateString(content, 20);
	return (
		<a className='postItem' href={id}>
			<span>{title}</span>
			<span>{shortenedContent}</span>
			<span>{date.toDateString()}</span>
		</a>
	);
}
