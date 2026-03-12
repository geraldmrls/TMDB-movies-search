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
  const [data, setData] = useState(null);
  const [genresData, setGenresData] = useState(null)
  const [cardId, setCardId] = useState(null); //state lifted for Modal component
  const [movieDetails, setMovieDetails] = useState(null)
  const [movieTrailer, SetMovieTrailer] = useState(null)

  useEffect(() => {
    const tmbdData = async () => {
      let response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      );
      setData(response.data);

      response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
      setGenresData(response.data)

    };
    tmbdData();
  }, []);

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
      <Header data={data} API_KEY={API_KEY} />

      {/* ─── HERO ─── */}
      <Hero data={data} genresData={genresData} randomIndex={randomIndex} />

      {/* ----MAIN---- */}
      <Main data={data} cardId={cardId} setCardId={setCardId} />

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