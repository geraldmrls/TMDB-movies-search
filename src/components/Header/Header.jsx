import { useState, useEffect } from "react"
import axios from "axios";

import "./Header.css"

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function Header() {
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

    return (
        <>
            <nav>
                <div className="nav-logo">Cine<span>Vault</span></div>
                <ul className="nav-links">
                    <li><a href="#" className="active">Discover</a></li>
                    <li><a href="#">Top Rated</a></li>
                    <li><a href="#">Trending</a></li>
                    <li><a href="#">Watchlist</a></li>
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