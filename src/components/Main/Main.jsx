
import { useState, useEffect } from "react";
import axios from "axios";

// components
import Trending from "./Trending/Trending";

import "./Main.css"


function Main({ data, cardId, setCardId, API_KEY }) {
    const [discoverMovie, setDiscoverMovie] = useState(null)
    const [genreId, setGenreId] = useState(null)
    useEffect(() => {
        const discoverMoviesById = async () => {
            if (genreId) {
                const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&api_key=${API_KEY}`)
                setDiscoverMovie(response.data);
            }
        }
        discoverMoviesById();
    }, [genreId, API_KEY])

    function getCardId(movie) {
        if (movie.id !== cardId) {
            setCardId(movie.id);
        } else {
            setCardId(null)
        }
    }

    const action = 28;
    const drama = 18;
    const comedy = 35;
    const thriller = 53;
    const sciFiction = 878;
    const horror = 27;
    const romance = 10749;

    function renderGrid() {
        if (genreId === null) {
            return (
                <>
                    {data && data.results.map(movie => (
                        <div className="movie-card" key={movie.id} >
                            <div className="card-poster">
                                <div className="card-img-placeholder">
                                    <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt="movie poster" />
                                </div>
                                <div className="card-rating">★ {movie.vote_average}</div>
                                <div className="card-overlay" onClick={() => getCardId(movie)}>
                                    <button className="card-overlay-btn" onClick={() => {
                                        getCardId(movie)
                                    }}>Details</button>
                                </div>
                            </div>
                            <div className="card-title">{movie.original_title}</div>
                            <div className="card-year">{movie.release_date}</div>
                        </div>
                    ))}
                </>
            )
        } else {
            return (
                <>
                    {discoverMovie && discoverMovie.results.map(movie => {
                        return (
                            <div className="movie-card" key={movie.id} >
                                <div className="card-poster">
                                    <div className="card-img-placeholder">
                                        <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt="movie poster" />
                                    </div>
                                    <div className="card-rating">★ {movie.vote_average}</div>
                                    <div className="card-overlay" onClick={() => getCardId(movie)}>
                                        <button className="card-overlay-btn" onClick={() => {
                                            getCardId(movie)
                                        }}>Details</button>
                                    </div>
                                </div>
                                <div className="card-title">{movie.original_title}</div>
                                <div className="card-year">{movie.release_date}</div>
                            </div>
                        )
                    })}
                </>
            )
        }
    }

    return (
        <>
            {/* ─── MAIN ─── */}
            <main>
                <section>
                    <div className="section-header">
                        <h2 className="section-title">Popular <span>Films</span></h2>
                        <a href="#" className="section-link">View all →</a>
                    </div>

                    <div className="genre-tabs">
                        <button className={`genre-tab ${genreId===null ? "active" : ""}`} onClick={()=>setGenreId(null)}>All</button>
                        <button className={`genre-tab ${genreId===action ? "active" : ""}`} onClick={() => setGenreId(action)}>Action</button>
                        <button className={`genre-tab ${genreId===drama ? "active" : ""}`} onClick={() => setGenreId(drama)}>Drama</button>
                        <button className={`genre-tab ${genreId===comedy ? "active" : ""}`} onClick={() => setGenreId(comedy)}>Comedy</button>
                        <button className={`genre-tab ${genreId===thriller ? "active" : ""}`} onClick={() => setGenreId(thriller)}>Thriller</button>
                        <button className={`genre-tab ${genreId===sciFiction ? "active" : ""}`} onClick={() => setGenreId(sciFiction)}>Sci-Fi</button>
                        <button className={`genre-tab ${genreId===horror ? "active" : ""}`} onClick={() => setGenreId(horror)}>Horror</button>
                        <button className={`genre-tab ${genreId===romance ? "active" : ""}`} onClick={() => setGenreId(romance)}>Romance</button>
                    </div>

                    {/* 🔧 Replace with: {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)} */}
                    <div className="movies-grid">
                        {renderGrid()}
                    </div>

                    <div className="pagination">
                        <button className="page-btn">‹</button>
                        <button className="page-btn active">1</button>
                        <button className="page-btn">2</button>
                        <button className="page-btn">3</button>
                        <button className="page-btn">›</button>
                    </div>
                </section>

                {/* Trending Row */}
                <Trending API_KEY={API_KEY}/>
                
            </main>
        </>
    )
}

export default Main;