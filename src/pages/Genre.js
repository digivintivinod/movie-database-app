import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/genre.css";
import { apiGet } from "../utils/api";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Genres() {
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedGenerId = searchParams.get("selectedMovie") ?? "28";

  useEffect(() => {
    const path = `genre/movie/list?api_key=${process.env.REACT_APP_apiKey}&language=en-US`;
    apiGet({ path })
      .then((data) => data.json())
      .then((data) => setGenres(data?.genres || []));
  }, []);

  useEffect(() => {
    if (selectedGenerId) {
      const path = `discover/movie?with_genres=${selectedGenerId}&api_key=${
        process.env.REACT_APP_apiKey
      }&page=${1}`;
      apiGet({ path })
        .then((data) => data.json())
        .then((data) => setMovies(data?.results ?? []));
    }
  }, [selectedGenerId]);

  const handleGenreCLick = async (id) => {
    const path = `discover/movie?with_genres=${id}&api_key=${
      process.env.REACT_APP_apiKey
    }&page=${1}`;
    apiGet({ path })
      .then((data) => data.json())
      .then((data) => setMovies(data?.results ?? []));
    navigate({
      pathname: `${currentPath}`,
      search: `?selectedMovie=${id}`,
    });
  };

  return (
    <>
      <div className="genres_heading">Genres</div>
      <div style={{ textAlign: "center" }}>
        {genres?.map((genre) => (
          <div
            className={`catagory-tab ${
              selectedGenerId === (genre?.id ?? 28).toString()
                ? "active"
                : "inactive"
            }`}
            onClick={() => handleGenreCLick(genre?.id)}
            key={genre?.id}
          >
            {genre?.name}
          </div>
        ))}
      </div>
      {movies?.length > 0 ? <div className="movies_list">Movies List</div> : ""}
      <div className="card">
        {movies?.map((movie) => (
          <div onClick={() => handleGenreCLick(movie?.id)} key={movies?.id}>
            <Link
              to={`/movie/${movie.id}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              <div className="cards">
                <img
                  className="cards__img"
                  alt="cards-img"
                  src={`https://image.tmdb.org/t/p/w500${
                    movie ? movie.poster_path : ""
                  }`}
                />
                <div className="cards__overlay">
                  <div className="card__title">
                    {movie ? movie.original_title : ""}
                  </div>
                  <div className="card__runtime">
                    {movie ? movie.release_date : ""}
                    <span className="card__rating">
                      {movie ? movie.vote_average : ""}
                      <i className="fas fa-star" />
                    </span>
                  </div>
                  <div className="card__description">
                    {movie ? movie.overview.slice(0, 118) + "..." : ""}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
