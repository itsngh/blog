import { useState } from "react";
import { Post, PostProps } from "./components/Post";
import "./App.css";

function App() {
	// const [searchTerm, setSearchTerm] = useState("");
	const [posts, setPosts] = useState<PostProps[]>();

	function handlePostAppend(event: React.MouseEvent<HTMLElement>): void {
		event.preventDefault();
		const newPost: PostProps = {
			title: crypto.randomUUID(),
			content: crypto.randomUUID(),
			date: new Date("2024-08-02T00:00:00.000Z"),
			id: crypto.randomUUID(),
		};
		setPosts([...(posts || []), newPost]);
	}

	return (
		<div className='bg-black text-white w-screen h-screen'>
			{/* <h1 className=''>Find a post or an user</h1>
			<input
				className='bg-gray-950 w-5/6 h-10 border-2 rounded-3xl'
				id='searchPrompt'
				value={searchTerm}
				onChange={(element) => {
					setSearchTerm(element.target.value);
				}}
			/> */}
			<button
				onClick={(e: React.MouseEvent<HTMLElement>) =>
					handlePostAppend(e)
				}
			>
				add post
			</button>
			<p>search bar</p>
			<p>posts</p>
			<div className='posts-wrapper w-screen grid grid-cols-3'>
				{posts?.map((post) => {
					return (
						<Post
							title={post.title}
							content={post.content}
							date={post.date}
							id={post.id}
						></Post>
					);
				})}
			</div>
		</div>
	);
}

export default App;
