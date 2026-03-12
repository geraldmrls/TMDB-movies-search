
import "./Modal.css"

function Modal() {
    return (
        <>
            <div className="modal-overlay">
                <div className="modal">
                    <button className="modal-close">✕</button>
                    <div className="modal-poster">🎬</div>
                    <div className="modal-body">
                        <div className="modal-genres">
                            <span className="modal-genre-tag">Drama</span>
                            <span className="modal-genre-tag">Thriller</span>
                        </div>
                        <h2 className="modal-title">Movie Title Goes Here</h2>
                        <div className="modal-meta">
                            <span className="rating">★ 8.4</span>
                            <span>2024</span>
                            <span>2h 10m</span>
                        </div>
                        <p className="modal-overview">
                            The movie overview from the API goes here. This gives users a summary of the plot
                            and tone of the film before they decide to watch the trailer or add it to their watchlist.
                        </p>
                        <div className="modal-actions">
                            <button className="btn-primary">▶ Watch Trailer</button>
                            <button className="btn-secondary">+ Watchlist</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal;