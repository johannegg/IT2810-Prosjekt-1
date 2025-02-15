import React from "react";
import { useEffect, useState } from "react";
import "./JokeCard.css";
import { inUseIDs, JokeResponse } from "../../restAPI/jokesAPI";

interface JokeCardProps {
	jokeResponse: JokeResponse;
	isSlideshowCard?: boolean;
}

function JokeCard({ jokeResponse: j, isSlideshowCard }: JokeCardProps) {
	const [joke, setJoke] = useState<string>("Loading...");
	const [isFavorite, setIsFavorite] = useState<boolean>(false);
	const [isTwopart, setTwopart] = useState<boolean>(false);

	useEffect(() => {
		if (j.isLoading) {
			setJoke("Loading...");
		} else if (j.error) {
			setJoke(j.error.message);
		} else if (j) {
			if (j.type === "single" && j.joke) {
				setJoke(j.joke);
			} else if (j.type === "twopart" && j.setup && j.delivery) {
				setJoke(`${j.setup} - ${j.delivery}`);
				setTwopart(true);
			}
		}
	}, [j]);

	useEffect(() => {
		// Load favorite status from localStorage
		const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
		const isCurrentJokeFavorite = savedFavorites.includes(joke);
		setIsFavorite(isCurrentJokeFavorite);
	}, [joke]);

	const handleFavoriteClick = () => {
		const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
		if (isFavorite) {
			// Remove the joke from favorites
			const updatedFavorites = savedFavorites.filter((favJoke: string) => favJoke !== joke);
			localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
		} else {
			// Add the joke to favorites
			const updatedFavorites = [...savedFavorites, joke];
			localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
		}
		setIsFavorite(!isFavorite);
	};

	return (
		<section className={`card ${isSlideshowCard ? "slideshow-card" : ""}`} role="figure">
			<section className="text">
				<h3>Joke #{inUseIDs.indexOf(j.id) + 1}</h3>
				{isTwopart ? (
					<>
						<p>{j.setup}</p>
						<p>- {j.delivery}</p>
					</>
				) : (
					<p>- {joke}</p>
				)}
			</section>
			{/* Star: to favorite a joke */}
			<button onClick={handleFavoriteClick} className="favorite-button">
				{isFavorite ? "★" : "☆"}
			</button>
		</section>
	);
}

export default JokeCard;
