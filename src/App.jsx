import { useState } from 'react'
import './App.css'
import Gallery from "./components/Gallery"
import BanList from "./components/BanList"
function App() {
  const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
  const [currentImage, setCurrentImage] = useState(null);
  const [prevImages, setPrevImages] = useState([]);
  const [banList, setBanList] = useState(null);

  const makeQuery = () => {
    let query = `https://api.artic.edu/api/v1/artworks?page=${Math.floor(Math.random() * 10)}&limit=100`;
    callAPI(query).catch(console.error);
  }

  const callAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();

    console.log(json)
    if (json == null) {
      alert("Oops! Something went wrong with that query, let's try again!")
        }
    else {
      setCurrentImage(json.data[0]);
      setPrevImages((images) => [...images, json.data[0]]);
    }
  }
  
  return (
    <>
      <div className="whole-page">
        <Gallery images={prevImages}/>
        <div className="container">
          <div>Made with <a href="https://api.artic.edu/api/v1/artworks">Art Institute of Chicago</a></div>
          {currentImage ? (
            <img
              className="cat-image"
              src={`https://www.artic.edu/iiif/2/${currentImage.image_id}/full/843,/0/default.jpg`}
              alt="A kitty cat"
            />
          ) : (
            <div> </div>
          )}
          <button className="query-button" onClick={makeQuery}>CALL API</button>
        </div>
        <BanList />
      </div>
    </>
  )
}

export default App;
