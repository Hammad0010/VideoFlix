import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
    const navigate = useNavigate();
    const { movieId } = useParams();
    const selectedMovie = movies.find((movie) => movie._id === movieId);

    if (!selectedMovie) {
        // Handle the case where the movie with the given movieId is not found
        return <div>Movie not found</div>;
    }

    return (
        <div className="movie-info">
            <div>
                <img src={selectedMovie.image} alt={selectedMovie.title} />
            </div>
            <div>
                <span className="bold">Title: </span>
                <span>{selectedMovie.title}</span>
            </div>
            <div>
                <span className="bold">Description: </span>
                <span>{selectedMovie.description}</span>
            </div>
            <div>
                <span className="bold">Release Year: </span>
                <span>{selectedMovie.year}</span>
            </div>
            <div>
                <span className="bold">Genre: </span>
                <span>{selectedMovie.genre.genreName}</span>
            </div>
            <div>
                <span className="bold">Genre Description: </span>
                <span>{selectedMovie.genre.description}</span>
            </div>
            <div>
                <span className="bold">Director: </span>
                <span>{selectedMovie.director.name}</span>
            </div>
            <div>
                <span className="bold">Born: </span>
                <span>{selectedMovie.director.birth}</span>
            </div>
            <div>
                <span className="bold">Died: </span>
                <span>{selectedMovie.director.death}</span>
            </div>
            <div>
                <span className="bold">Bio: </span>
                <span>{selectedMovie.director.bio}</span>
            </div>
            <button className="button" onClick={() => navigate("/")}>Back</button>
        </div>
    );
};

MovieView.propTypes = {
    movies: PropTypes.array.isRequired,
};
