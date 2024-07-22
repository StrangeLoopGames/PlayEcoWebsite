function ArtCard() {
    return (
        <div className="account-feature">
            <h2 className="title-medium-white account-feature-title">Art Pack</h2>
            <div className="account-feature-description">
                View our pre-production art pack, in all it's high-res awesomeness.
                <a href={`${import.meta.env.VITE_CLOUD_API_URL}s3/public/ECO_ArtPack.pdf`} target="_blank" className="btn btn-small btn-corner"> Art Pack</a>
            </div>
        </div>
    )
}
export default ArtCard