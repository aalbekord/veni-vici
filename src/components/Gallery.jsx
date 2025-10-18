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
                  className="cat-pic"
                  src={pic.url}
                  alt="previously generated cat pic"
                  width="500"
                />
                <p>A {pic.breed} cat from {pic.origin}</p>
                <p>Placeholder</p>
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