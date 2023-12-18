export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img src={movie.image} alt={movie.title} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.Genre}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.Director}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};
