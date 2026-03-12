
import "./Main.css"

function Main({ data }) {

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
                        <button className="genre-tab active">All</button>
                        <button className="genre-tab">Action</button>
                        <button className="genre-tab">Drama</button>
                        <button className="genre-tab">Comedy</button>
                        <button className="genre-tab">Thriller</button>
                        <button className="genre-tab">Sci-Fi</button>
                        <button className="genre-tab">Horror</button>
                        <button className="genre-tab">Romance</button>
                    </div>

                    {/* 🔧 Replace with: {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)} */}
                    <div className="movies-grid">
                        {data && data.results.map(movie => (
                            <div className="movie-card" key={movie.id} >
                                <div className="card-poster">
                                    <div className="card-img-placeholder">
                                        <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt="movie poster" />
                                    </div>
                                    <div className="card-rating">★ {movie.vote_average}</div>
                                    <div className="card-overlay">
                                        <button className="card-overlay-btn" onClick={() => {
                                            console.log("working")
                                        }}>Details</button>
                                    </div>
                                </div>
                                <div className="card-title">{movie.original_title}</div>
                                <div className="card-year">{movie.release_date}</div>
                            </div>
                        ))}
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
                <section className="scroll-section">
                    <div className="section-header">
                        <h2 className="section-title">Trending <span>This Week</span></h2>
                        <a href="#" className="section-link">View all →</a>
                    </div>
                    {/* 🔧 Replace with: fetch /trending/movie/week */}
                    <div className="movies-row">
                        {[
                            { emoji: "🎬", rating: "8.1", year: "2024" },
                            { emoji: "🎭", rating: "7.3", year: "2023" },
                            { emoji: "🎥", rating: "9.1", year: "2024" },
                            { emoji: "🎞️", rating: "6.9", year: "2022" },
                            { emoji: "🎬", rating: "7.7", year: "2024" },
                            { emoji: "🎭", rating: "8.3", year: "2023" },
                        ].map((m, i) => (
                            <div className="movie-card" key={i}>
                                <div className="card-poster">
                                    <div className="card-img-placeholder">{m.emoji}</div>
                                    <div className="card-rating">★ {m.rating}</div>
                                    <div className="card-overlay">
                                        <button className="card-overlay-btn">Details</button>
                                    </div>
                                </div>
                                <div className="card-title">movie title</div>
                                <div className="card-year">{m.year}</div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </>
    )
}

export default Main;