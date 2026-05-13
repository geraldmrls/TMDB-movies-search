import { useState, useEffect } from "react"
import axios from "axios";

import "./Header.css"

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function Header({ setDefaultPage, defaultPage, watchList }) {
    const [searchData, setSearchData] = useState(null);
    const [input, setInput] = useState("");

    useEffect(() => {
        if (!input) return;
        const timer = setTimeout(async () => {
            let response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${input}&api_key=${API_KEY}&language=en-US`);
            setSearchData(response.data.results.slice(0, 5))
        }, 500);

        return () => clearTimeout(timer)
    }, [input])



    function searchMovie(event) {
        setInput(event.target.value);

    }

    function returnSuggestions() {
        if (input === "") {
            return
        } else {
            return (
                <div className="search-dropdown">
                    {searchData?.map(movie => {
                        return (
                            <div className="search-result-item" key={movie.id}>
                                <div style={{ width: "32px", height: "46px", background: "var(--surface)", flexShrink: 0 }}>
                                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} />
                                </div>
                                <span>{movie.original_title}</span>
                            </div>
                        )
                    })}
                </div>
            )
        }
    }

    // total watchlist count for header
    const watchListCount = watchList.length;

    return (
        <>
            <nav>
                <div className="nav-logo">Cine<span>Vault</span></div>
                <ul className="nav-links">
                    <li><a href="#movies-section" className={`${defaultPage === "discover" ? "active" : ""}`} onClick={() => setDefaultPage("discover")}>Discover</a></li>
                    <li><a href="#movies-section" className={`${defaultPage === "top_rated" ? "active" : ""}`} onClick={() => {
                        setDefaultPage("top_rated");
                    }}>Top Rated</a></li>
                    <li><a href="#movies-section" className={`${defaultPage === "trending" ? "active" : ""}`} onClick={() => setDefaultPage("trending")}>Trending</a></li>
                    <li className="watchlist-tab">
                        <a href="#movies-section" className={`${defaultPage === "watchlist" ? "active" : ""}`} onClick={() => setDefaultPage("watchlist")}>Watchlist
                        </a>
                        <span className="watchlist-count">{watchListCount}</span>
                    </li>
                </ul>
                <div className="search-wrap">
                    <span className="search-icon">⌕</span>
                    <input className="search-input" type="text" placeholder="Search films…" value={input} onChange={event => {
                        searchMovie(event)
                    }} />

                    {returnSuggestions()}

                </div>
            </nav>
        </>
    )
}

export default Header