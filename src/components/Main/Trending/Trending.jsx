
import { useState, useEffect } from "react"
import axios from "axios"

import "./trending.css"

function Trending({ API_KEY }) {
    const [trendingData, setTrendingData] = useState(null)

    useEffect(() => {
        const getTrendingData = async () => {
            const reponse = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`);
            setTrendingData(reponse.data)
        }
        getTrendingData()
    }, [API_KEY])


    return (
        <>
            <section className="scroll-section">
                <div className="section-header">
                    <h2 className="section-title">Trending <span>This Week</span></h2>
                    <a href="#" className="section-link">View all →</a>
                </div>
                {/* 🔧 Replace with: fetch /trending/movie/week */}
                <div className="movies-row">
                    {trendingData?.results.map(movie => (
                        <div className="movie-card" key={movie}>
                            <div className="card-poster">
                                <div className="card-img-placeholder">
                                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}/>
                                </div>
                                <div className="card-rating">★ {movie.vote_count}</div>
                                <div className="card-overlay">
                                    <button className="card-overlay-btn">{movie.overview}</button>
                                </div>
                            </div>
                            <div className="card-title">{movie.original_title}</div>
                            <div className="card-year">{movie.release_date}</div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default Trending