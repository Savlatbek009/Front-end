const Movie = (props) => {
  const { Title, Year, imdbID, Type, Poster } = props;
  return (
    <div key={imdbID} className="movie card">
      <img src={Poster} className="card-img-top" alt="" />
      <div className="card-body">
        <h5 className="card-title">{Title}</h5>
        <p className="card-text">
          {Year} <span className="text-center">{Type}</span>
        </p>
      </div>
    </div>
  );
};

export default Movie;
