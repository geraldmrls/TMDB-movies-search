import { useEffect } from "react";
import { Fragment } from "react";

import "./Modal.css"

function Modal({ cardId, setCardId, movieDetails, movieTrailer }) {

    useEffect(() => {
        console.log(cardId)
    }, [cardId])

    if (!movieDetails) return null;


    function convertTime() {
        const hours = Math.floor(movieDetails.runtime / 60);
        const minutes = movieDetails.runtime % 60;
        return `${hours}h ${minutes}m`
    }

    function renderGenres() {
        return movieDetails.genres.map(genre => {
            return (
                <Fragment key={genre.id}>
                    <span className="modal-genre-tag">{genre.name}</span>
                </Fragment>
            )

        })
    }

    const trailer = movieTrailer?.results?.find(video => {
        return video.type === "Trailer" && video.site === "YouTube"
    })

    return (
        <>
            <div className={`modal-overlay ${!cardId ? "" : "active"}`} onClick={()=>{setCardId(null)}}>
                <div className="modal" onClick={(e)=>{e.stopPropagation()}}>
                    <button className="modal-close" onClick={() => {
                        setCardId(null)
                    }}>✕</button>
                    <div className="modal-poster">
                        <img src={`https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`} />
                    </div>
                    <div className="modal-body">
                        <div className="modal-genres">
                            {renderGenres()}
                        </div>
                        <h2 className="modal-title">{movieDetails.original_title}</h2>
                        <div className="modal-meta">
                            <span className="rating">★ {movieDetails.vote_average}</span>
                            <span>{movieDetails.release_date}</span>
                            <span>{convertTime()}</span>
                        </div>
                        <p className="modal-overview">
                            {movieDetails.overview}
                        </p>
                        <div className="modal-actions">
                            <a href={`https://www.youtube.com/watch?v=${trailer?.key}`} target="_blank">
                                <button className="btn-primary">▶ Watch Trailer</button>
                            </a>
                            <button className="btn-secondary">+ Watchlist</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal;