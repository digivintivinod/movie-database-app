import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

import ContextPage from "../ContextPage";

function Searchbar() {
  const { filteredGenre, fetchSearch, setBackGenre, setGenres } =
    useContext(ContextPage);
  const [value, setValue] = useState("");

  const onKeyUp = (event) => {
    if (event.key === "Enter" && value !== "") {
      const query = value.trim();

      if (query === "") {
        filteredGenre();
      } else {
        fetchSearch(query);
        setGenres([]);
        setBackGenre(true);
      }
      setValue("");
    }
  };

   console.log(filteredGenre);

  return (
    <>
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="form">
              <i className="fa-fa-search"></i>
              <input
                type="search"
                name="searchpanel"
                id="searchpanel"
                placeholder="Search movie"
                className="form-control form-input"
                onKeyDown={(e) => onKeyUp(e)}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Searchbar;
