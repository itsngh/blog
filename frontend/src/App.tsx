import { useState } from "react";
import "./App.css";

function resolveTerm(term: string) {
	if (term.startsWith("@")); // user
}

function App() {
	const [searchTerm, setSearchTerm] = useState("");

	return (
		<div className='bg-black text-white w-screen h-screen flex justify-center align-center'>
			<h1 className=''>Find a post or an user</h1>
			<input
				className='bg-gray-950 w-5/6 h-10 border-2 rounded-3xl'
				id='searchPrompt'
				value={searchTerm}
				onChange={(element) => {
					setSearchTerm(element.target.value);
				}}
			/>
		</div>
	);
}

export default App;
