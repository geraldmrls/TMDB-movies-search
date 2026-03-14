


import getMatchedGenre from "../../react-functions/getMatchedGenre.js"
import "./Hero.css"


function Hero({ popularData, genresData, randomIndex }) {

    if (!popularData || !genresData) return null

    const matchedGenre = getMatchedGenre(popularData, genresData, randomIndex);

    return (
        <section className="hero">
            <div className="hero-bg">
                <img className="" src={`https://image.tmdb.org/t/p/original${popularData.results[randomIndex].backdrop_path}`} alt="movie poster" />
            </div>
            <div className="hero-content">
                <div className="hero-badge">⭐ Featured Tonight</div>
                <h1 className="hero-title">{popularData.results[randomIndex].original_title}<br /></h1>
                <div className="hero-meta">
                    <span className="rating">★ {popularData.results[randomIndex].vote_average}</span>
                    <span className="dot"></span>
                    <span>{popularData.results[randomIndex].release_date}</span>
                    <span className="dot"></span>
                    <span>{matchedGenre.map(genre => {
                        return genre.name
                    }).join(" | ")}</span>
                    <span className="dot"></span>
                </div>
                <p className="hero-overview">
                    {popularData.results[randomIndex].overview}
                </p>
                <div className="hero-actions">
                    <button className="btn-primary">▶ View Details</button>
                    <button className="btn-secondary">+ Watchlist</button>
                </div>
            </div>
        </section>
    )
}

export default Hero