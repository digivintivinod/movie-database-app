import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../styles/genre.css'

export default function Genres() {
  const APIKEY = "4e44d9029b1270a757cddc766a1bcb63";
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);

  const fetchGenre = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKEY}&language=en-US`
      );
      console.log("data", data);

      const gen = await data.json();

      setGenres(gen?.genres || []);
    } catch (err) {
      console.log("error", err);
    }
  };
  useEffect(() => {
    fetchGenre();
  }, []);

  const handleGenreCLick = async (id) => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${id}&api_key=${APIKEY}&page=${1}`
      );
      const movies = await data.json();
      console.log("movies", movies?.results || []);
      setMovies(movies?.results || []);
    } catch (err) {
      console.log("error", err);
    }
  };
  return (
<>
      <div style={{fontSize:"30px",textAlign:"center",margin:"20px",padding:"20px"}}>Geners</div>
      <div>
        {genres?.map((genre) => (
          <div
            onClick={() => handleGenreCLick(genre?.id) }
            key={genre?.id}
            style={{
              display: "inline-block",
              cursor: "pointer",
              border: "0.5px solid white",
              borderRadius: "20px",
              padding: "8px",
              margin: "10px",
            }}
          >
            {genre?.name}
          </div>
        ))}
      </div>
      {movies?.length > 0 ? <div style={{textAlign:"center",margin:"20px",padding:"20px",fontSize:"30px"}}>Movies List</div> : ""}
      <div style={{ display: "flex",flexDirection:"row",boxSizing:"border-box"}}>
        

        {movies?.map((movie) => (
          <div
            onClick={() => handleGenreCLick(movie?.id)}
            key={movies?.id}
          >
             <Link to={`/movie/${movie.id}`} style={{textDecoration:"none", color:"white"}}>
            <div className="cards">
                <img className="cards__img" alt=""src={`https://image.tmdb.org/t/p/w500${movie?movie.poster_path:""}`} />
                <div className="cards__overlay">
                    <div className="card__title">{movie?movie.original_title:""}</div>
                    <div className="card__runtime">
                        {movie?movie.release_date:""}
                        <span className="card__rating">{movie?movie.vote_average:""}<i className="fas fa-star" /></span>
                    </div>
                    <div className="card__description">{movie ? movie.overview.slice(0,118)+"..." : ""}</div>
                </div>
            </div>
        </Link>
            {movie?.title}
          </div>
        ))}
      </div>
    </>
  );
}
