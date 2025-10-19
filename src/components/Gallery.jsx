import "./Gallery.css"

const Gallery = (props) => {
  return (
    <>
      <div className="gallery-container">
        <h2>Previous Pieces</h2>
        <div className="image-container">
          {props.images && props.images.length > 0 ? (
            props.images.map((pic, index) => (
              <li className="gallery" key={index}>
                <img
                  className="prev-img"
                  src={`https://www.artic.edu/iiif/2/${pic.image_id}/full/843,/0/default.jpg`}
                  alt="previously generated art piece"
                  width="500"
                />
                <p>{pic.credit_line}, a(n) {pic.artwork_type_title} work by {pic.artist_title}</p>
              </li>
            ))
          ) : (
            <div>
              <h3>You haven't searched anything yet.</h3>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
export default Gallery;