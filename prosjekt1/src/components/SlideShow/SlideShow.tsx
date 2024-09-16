import { useState } from "react";
import "../JokeCard/JokeCard";
import "./SlideShow.css";
import "../../index.css";
import JokeCard from "../JokeCard/JokeCard";
import {validIDs, useJokeById } from "../../restAPI/jokesAPI"; 


function JokeSlideshow() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Hent vitsen basert på gjeldende ID fra validIDs (ved bruk av index i listen)
  const currentJokeId = validIDs[currentIndex];


  // Funksjon for neste vits
  const nextJoke = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex < validIDs.length - 1 ? prevIndex + 1 : 0 
    );
  };

  // Funksjon for forrige vits
  const previousJoke = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : validIDs.length - 1 
    );
  };

  const { data: joke, error, isLoading } = useJokeById(currentJokeId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading joke</div>;
  }

  return (
    <div className="slideshow-container">
        {joke && (
        <JokeCard jokeResponse={joke} key={currentJokeId} />
      )}
      <div className="controls">
        <button className="button" onClick={previousJoke}>
          Previous
        </button>
        <button className="button" onClick={nextJoke}>
          Next
        </button>
      </div>
    </div>
  );
}

export default JokeSlideshow;
