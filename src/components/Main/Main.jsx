
import { useState, useEffect } from "react";
import axios from "axios";

// components
import Trending from "./Trending/Trending";

import "./Main.css"


function Main({ popularData, cardId, setCardId, API_KEY, setPage, page, isLoading, defaultPage, watchList }) {
    const [topRatedData, setTopRatedData] = useState(null)
    const [trendingData, setTrendingData] = useState(null)
    const [discoverMovie, setDiscoverMovie] = useState(null)
    const [genreId, setGenreId] = useState(() => {
        const genreIdSaved = localStorage.getItem("genre-id");
        return genreIdSaved ? JSON.parse(genreIdSaved) : null
    })
    const [buttons, setButtons] = useState([1, 2, 3]);

    useEffect(() => {
        localStorage.setItem("genre-id", JSON.stringify(genreId))
    }, [genreId])

    // fetch movies by genre id
    useEffect(() => {
        const discoverMoviesById = async () => {
            if (genreId) {
                let response = await axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&api_key=${API_KEY}&page=${page}`)
                setDiscoverMovie(response.data);
            }
        }
        discoverMoviesById();
    }, [genreId, API_KEY, page])

    // fetch top rated movies - trending
    useEffect(() => {
        const fetchTopRated = async () => {
            let response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${page}`)
            setTopRatedData(response.data)

            response = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=${page}`)
            setTrendingData(response.data)
        }
        fetchTopRated();
    }, [API_KEY, page])

    function renderSkeleton() {
        return [1, 2, 3, 4, 5, 6, 7, 8].map(num => (
            <div className="skeleton-card" key={num}></div>
        ))
    }


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
        if (isLoading) return renderSkeleton()
        if (defaultPage === "discover") {
            if (genreId === null) {
                return (
                    <>
                        {popularData && popularData.results.map(movie => (
                            <div className="movie-card" key={movie.id}>
                                <div className="card-poster">
                                    <div className="card-img-placeholder">
                                        <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt="movie poster" />
                                    </div>
                                    <div className="card-rating">★ {(movie.vote_average).toFixed(1)}</div>
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
                                            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt="movie poster" />
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
        } else if (defaultPage === "top_rated") {
            return (
                <>
                    {topRatedData && topRatedData.results.map(movie => {
                        return (
                            <div className="movie-card" key={movie.id} >
                                <div className="card-poster">
                                    <div className="card-img-placeholder">
                                        <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt="movie poster" />
                                    </div>
                                    <div className="card-rating">★ {(movie.vote_average).toFixed(1)}</div>
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
        } else if (defaultPage === "trending") {
            return (
                <>
                    {trendingData && trendingData.results.map(movie => {
                        return (
                            <div className="movie-card" key={movie.id} >
                                <div className="card-poster">
                                    <div className="card-img-placeholder">
                                        <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt="movie poster" />
                                    </div>
                                    <div className="card-rating">★ {(movie.vote_average).toFixed(1)}</div>
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
        }else if(defaultPage === "watchlist"){

            if(watchList.length === 0){
                return (
                    <div className="empty-watchlist">
                        <p>Your watchlist is empty.</p>
                    </div>
                )
            }

            return (
                <>
                    {watchList && watchList.map(movie => {
                        return (
                            <div className="movie-card" key={movie.id} >
                                <div className="card-poster">
                                    <div className="card-img-placeholder">
                                        <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt="movie poster" />
                                    </div>
                                    <div className="card-rating">★ {(movie.vote_average).toFixed(1)}</div>
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

    function renderButtons() {

        if (page > buttons[2]) {
            setButtons(() => {
                return buttons.map(button => {
                    return button + 3
                })
            })
        }

        if (page < buttons[0]) {
            setButtons(() => {
                return buttons.map(buttons => {
                    return buttons - 3
                })
            })
        }


        return buttons.map(num => {
            return (
                <button key={num} className={`page-btn ${page === num ? "active" : ""}`} onClick={() => setPage(num)}>{num}</button>
            )
        })

    }

    return (
        <>
            {/* ─── MAIN ─── */}
            <main>
                <section id="movies-section">
                    <div className="section-header">
                        <h2 className="section-title">{defaultPage === "discover" ? "Discover" : defaultPage === "top_rated" ? "Top Rated" : defaultPage === "trending" ? "Trending" : "Watchlist"}<span></span></h2>
                        <a href="#" className="section-link">View all →</a>
                    </div>

                    <div className={`genre-tabs ${defaultPage === "discover" ? "" : "hidden-genre-tabs"}`}>
                        <button className={`genre-tab ${genreId === null ? "active" : ""}`} onClick={() => {
                            setGenreId(null)
                            setPage(1)
                        }}>All</button>

                        <button className={`genre-tab ${genreId === action ? "active" : ""}`} onClick={() => {
                            setGenreId(action)
                            setPage(1)
                        }}>Action</button>

                        <button className={`genre-tab ${genreId === drama ? "active" : ""}`} onClick={() => {
                            setGenreId(drama)
                            setPage(1)
                        }}>Drama</button>

                        <button className={`genre-tab ${genreId === comedy ? "active" : ""}`} onClick={() => {
                            setGenreId(comedy)
                            setPage(1)
                        }}>Comedy</button>

                        <button className={`genre-tab ${genreId === thriller ? "active" : ""}`} onClick={() => {
                            setGenreId(thriller)
                            setPage(1)
                        }}>Thriller</button>

                        <button className={`genre-tab ${genreId === sciFiction ? "active" : ""}`} onClick={() => {
                            setGenreId(sciFiction)
                            setPage(1)
                        }}>Sci-Fi</button>

                        <button className={`genre-tab ${genreId === horror ? "active" : ""}`} onClick={() => {
                            setGenreId(horror)
                            setPage(1)
                        }}>Horror</button>

                        <button className={`genre-tab ${genreId === romance ? "active" : ""}`} onClick={() => {
                            setGenreId(romance)
                            setPage(1)
                        }}>Romance</button>
                    </div>

                    {/* 🔧 Replace with: {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)} */}
                    <div className="movies-grid">
                        {renderGrid()}
                    </div>

                    <div className="pagination">
                        {/* return button */}
                        <button className="page-btn" onClick={() => {
                            setPage(() => {
                                if (page <= 1) {
                                    return 1
                                }
                                return page - 1
                            })
                        }}>‹</button>
                        {renderButtons()}

                        {/* next button */}
                        <button className="page-btn" onClick={() => setPage(page + 1)}>›</button>

                    </div>
                </section>

                {/* Trending Row */}
                <Trending API_KEY={API_KEY} />

            </main>
        </>
    )
}

export default Main;