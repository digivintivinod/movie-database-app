import { createContext, useState } from "react";
import { apiGet } from "./utils/api";

const ContextPage = createContext();

export function MovieProvider({ children }) {
  const [header, setHeader] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(true);
  const [activegenre, setActiveGenre] = useState(28);
  const [genres, setGenres] = useState([]);
  const [backgenre, setBackGenre] = useState(false);
  const [selectedGener, setSelectedGener] = useState();
  const [totalResults, setTotalResults] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentMovie, setCurrentMovie] = useState(null);

  if (page > 1) {
    setPage(1);
  }

  const filteredGenre = async () => {
    try {
      const path = `discover/movie?with_genres=${activegenre}&api_key=${process.env.REACT_APP_apiKey}&page=${page}`;
      const data = await apiGet({ path });
      const moviesRes = await data.json();
      setMovies(moviesRes);
      setLoader(false);
      setHeader("Genres");
    } catch (err) {
      console.log("someting went wrong", err);
    }
  };

  const fetchSearch = async (query) => {
    try {
      const path = `search/movie?api_key=${process.env.REACT_APP_apiKey}&language=en-US&query=${query}&page=1&include_adult=false`;
      const data = await apiGet({ path });
      const searchmovies = await data.json();
      setMovies(searchmovies);
      setLoader(false);
      setHeader(`Results for "${query}"`);
    } catch (err) {
      console.log("someting went wrong", err);
    }
  };

  const fetchGenre = async () => {
    try {
      const path = `genre/movie/list?api_key=${process.env.REACT_APP_apiKey}&language=en-US`;
      const data = await apiGet({ path });
      const gen = await data.json();
      setGenres(gen.genres);
    } catch (err) {
      console.log("someting went wrong", err);
    }
  };

  return (
    <ContextPage.Provider
      value={{
        filteredGenre,
        header,
        setHeader,
        movies,
        setMovies,
        page,
        setPage,
        setActiveGenre,
        fetchSearch,
        loader,
        setLoader,
        genres,
        setGenres,
        fetchGenre,
        backgenre,
        setBackGenre,
        selectedGener,
        setSelectedGener,
        totalResults,
        setTotalResults,
        searchTerm,
        setSearchTerm,
        currentPage,
        setCurrentPage,
        currentMovie,
        setCurrentMovie,
      }}
    >
      {children}
    </ContextPage.Provider>
  );
}
export default ContextPage;
