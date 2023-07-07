import React, { useEffect, useState } from "react";
import "../styles/home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { apiGet } from "../utils/api";

const Home = () => {
  const [latestMovies, setLatestMovies] = useState([]);

  useEffect(() => {
    const path =
      "movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US";
    apiGet({ path })
      .then((res) => res.json())
      .then((data) => {
        const topFiveList = data.results?.splice(0, 5);
        setLatestMovies(topFiveList);
      });
  }, []);
  return (
    <>
      <div className="poster">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={3}
          infiniteLoop={true}
          showStatus={false}
        >
          {latestMovies.map((movie) => (
            <Link style={{ textDecoration: "none", color: "white" }}to={`/movie/${movie.id}`}>
              <div className="posterImage">
                <img alt="" src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`}/>
              </div>
                <div className="posterImage__overlay">
                <div className="posterImage__title">{movie ? movie.original_title : ""}</div>
                <div className="posterImage__runtime">{movie ? movie.release_date : ""}
                  <span className="posterImage__rating">{movie ? movie.vote_average : ""}
                  <i className="fas fa-star" />{""}</span></div>
                <div className="posterImage__description">{movie ? movie.overview : ""}</div>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default Home;
