import { useState } from "react";
import "./App.css";
import SlideShow from "./components/SlideShow/SlideShow";
import FavoritePage from "./components/FavoritePage/FavoritePage";


function App() {
	const [showFavorites, setShowFavorites] = useState(false); // State to track which page to show

	const handleToggleClick = () => {
		setShowFavorites((prevShowFavorites) => !prevShowFavorites); // Toggle between true and false
	};

	return (
		<>
			<h1>The Giggle Garden</h1>
			{/* Button text changes based on showFavorites state */}
			<button className="button" onClick={handleToggleClick}>
				{showFavorites ? "Back" : "Favorites"}
			</button>
			
			{/* Conditionally render FavoritePage or JokeCard based on state */}
			{showFavorites ? <FavoritePage /> : <SlideShow />}
		</>
	);
}

export default App
