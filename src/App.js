import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Genres from "./pages/Genre";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route index element={<Home />}></Route>
           <Route path={"/geners"} element={<Genres />}></Route>
          <Route path="movie/:id" element={<h1>movie detail page</h1>}></Route>
          <Route path="movie/:type" element={<h1>movies list page</h1>}></Route>
          <Route path="/" element={<h1>Error Page</h1>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
