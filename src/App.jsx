import { useEffect, useState } from "react";
import axios from "axios";

// components
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Main from "./components/Main/Main";
import Modal from "./components/Modal/Modal";

import "./App.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const randomIndex = Math.floor(Math.random() * 20);

function App() {
  const [popularData, setPopularData] = useState(null);
  const [genresData, setGenresData] = useState(null)
  const [cardId, setCardId] = useState(null); //state lifted for Modal component
  const [movieDetails, setMovieDetails] = useState(null)
  const [movieTrailer, SetMovieTrailer] = useState(null)
  const [page, setPage] = useState(1);

  useEffect(() => {
    const tmbdData = async () => {
      let response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=${API_KEY}`
      );
      setPopularData(response.data);

      response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
      setGenresData(response.data)

    };
    tmbdData();
  }, [page]);

  // movie details
  useEffect(() => {
    const getMovieDetails = async () => {
      if (cardId) {
        let response = await axios.get(`https://api.themoviedb.org/3/movie/${cardId}?api_key=${API_KEY}`);
        setMovieDetails(response.data);


        response = await axios.get(`https://api.themoviedb.org/3/movie/${cardId}/videos?api_key=${API_KEY}`);
        SetMovieTrailer(response.data)
      }

    }
    getMovieDetails()
  }, [cardId])

  useEffect(()=>{
    console.log(movieTrailer)
  }, [movieTrailer])


  return (
    <>
      {/* ─── NAVBAR Header─── */}
      <Header/>

      {/* ─── HERO ─── */}
      <Hero popularData={popularData} genresData={genresData} randomIndex={randomIndex} />

      {/* ----MAIN---- */}
      <Main popularData={popularData} cardId={cardId} setCardId={setCardId} API_KEY={API_KEY} setPage={setPage} page={page}/>

      {/* ─── MODAL ─── */}
      <Modal cardId={cardId} setCardId={setCardId} movieDetails={movieDetails} movieTrailer={movieTrailer}/>

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