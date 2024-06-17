import { useState } from "react";
import "./App.css";

function App() {
	const [searchTerm, setSearchTerm] = useState("");

	return (
		<>
			<h1>Find a post or an user</h1>
			<input
				id='searchPrompt'
				value={searchTerm}
				onChange={(element) => {
					setSearchTerm(element.target.value);
				}}
			/>
		</>
	);
}

export default App;
