import React from "react";
import Movie from "./Movie";

const Movies = (props) => {
  const { movies = [] } = props;
  return (
    <div>
      {movies.length ? (
        movies.map((movie) => <Movie key={movie.imdbID} {...movie} />)
      ) : (
        <div className="not-found">
          <h2>404 Not found</h2>
        </div>
      )}
    </div>
  );
};

export default Movies;
