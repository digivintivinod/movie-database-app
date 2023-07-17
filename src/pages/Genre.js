import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/genre.css";
import { apiGet } from "../utils/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import ContextPage from "../ContextPage";

export default function Genres() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const selectedGenerId = searchParams.get("selectedMovie") ?? "28";
  const currentPath = location.pathname;

  const {
    fetchGenre,
    filteredGenre,
    movies,
    setMovies,
    genres,
  } = useContext(ContextPage);

  const [movieList, setMovieList] = useState(movies?.results || []);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    fetchGenre();
    if (selectedGenerId) {
      filteredGenre();
    }
  }, []);

  useEffect(() => {
    setMovieList(movies?.results || []);
  }, [movies]);

  const fetchNextPageData = async () => {
    try {
      const path = `discover/movie?with_genres=${selectedGenerId}&api_key=${process.env.REACT_APP_apiKey}&page=${pageNumber}`;
      const data = await apiGet({ path });
      const movies = await data.json();
      setMovieList((prev) => [...prev, ...movies?.results]);
      setPageNumber((pre) => pre + 1);
    } catch (err) {
      console.log("Something went wrong", err);
    }
  };


  const handleGenreCLick = async (id) => {
    try {
      const path = `discover/movie?with_genres=${id}&api_key=${process.env.REACT_APP_apiKey}&page=${1}`;
      const data = await apiGet({ path });
      const movies = await data.json();
      setMovies(movies);
      setMovieList(movies?.results || []);
      setPageNumber(1);
    } catch (err) {
      console.log("error", err);
    }

    navigate({
      pathname: `${currentPath}`,
      search: `?selectedMovie=${id}`,
    });
  };

  
  return (
    <>
      {genres?.length ? (
        <>
          <div className="genres_heading">Genres</div>
          <div style={{ textAlign: "center",marginBottom:"20px" }}>
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
        </>
      ) : null}
      {console.log("movieList", movieList)}
      <div>
        <div>
          <InfiniteScroll
            className="content"
            dataLength={movieList.length || []}
            next={fetchNextPageData}
            hasMore={pageNumber <= movies?.total_pages}
            loader={<>Loading...</>}
          >
            {movieList?.map((movie) => (
              <div onClick={() => handleGenreCLick(movie?.id)} key={movie?.id}>
                <Link
                  to={`/movie/${movie.id}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <div className="cards">
                    <img
                      className="cards__img"
                      alt=""
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
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
}
