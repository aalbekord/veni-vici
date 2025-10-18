import { useState } from 'react'
import './App.css'
import Gallery from "./components/Gallery"
import BanList from "./components/BanList"
function App() {
  const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
  const [currentImage, setCurrentImage] = useState(null);
  const [prevImages, setPrevImages] = useState([]);
  const [banList, setBanList] = useState();

  const makeQuery = () => {
    let query = `https://api.thecatapi.com/v1/images/search?api-key=${ACCESS_KEY}&has_breeds=1`
    callAPI(query).catch(console.error);
  }

  const callAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();
    const data = json[0]
    console.log(json)
    if(json == null) {
      alert("Something went wrong with querying!")
    }
    else {
      setCurrentImage({"url": data.url, "weight": data["weight"], "breed": data["name"], "origin": data["origin"]})
      setPrevImages((images) => [...images, {"url": data.url, "weight": data["weight"], "breed": data["name"], "origin": data["origin"]}])
    }
  }
  
  return (
    <>
      <div className="whole-page">
        <Gallery images={prevImages}/>
        <div className="container">
          <div>Made with <a href="https://thecatapi.com/">The Cat Api</a></div>
          {currentImage ? (
            <img
              className="cat-image"
              src={currentImage.url}
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
