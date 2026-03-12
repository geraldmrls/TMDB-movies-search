import { useEffect, useState } from "react";
import axios from "axios";

// components
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Main from "./components/Main/Main";
import Modal from "./components/Modal/Modal";

import "./App.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function App() {
  const [data, setData] = useState(null);
  const [genres, setGenres] = useState(null)

  useEffect(() => {
    const tmbdData = async () => {
      let response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      );
      setData(response.data);

      response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
      setGenres(response.data)

    };
    tmbdData();
  }, []);


  return (
    <>
      {/* ─── NAVBAR Header─── */}
      <Header data={data} API_KEY={API_KEY}/>

      {/* ─── HERO ─── */}
      <Hero data={data} genres={genres}/>

      {/* ----MAIN---- */}
      <Main data={data}/>

      {/* ─── MODAL ─── */}
      <Modal/>

      {/* ─── FOOTER ─── */}
      <footer>
        <div className="footer-logo">Cine<span>Vault</span></div>
        <span>Powered by TMDB API</span>
        <span>© 2024 · Personal Project</span>
      </footer>
    </>
  );
}

export default App;