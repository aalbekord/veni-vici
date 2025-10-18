import { useState } from 'react'
import './App.css'
import Gallery from "./components/Gallery"
import BanList from "./components/BanList"
function App() {
  const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
  const [currentImage, setCurrentImage] = useState(null);
  const [prevImages, setPrevImages] = useState([]);
  const [banList, setBanList] = useState();
  const [inputs, setInputs] = useState({
    "classification": "Painting"
  });
  const makeQuery = () => {
    let randomPage = Math.floor(Math.random() * 100)
    let query = `https://api.harvardartmuseums.org/image?q=width:>2000&apikey=${ACCESS_KEY}&page=${randomPage}`
    callAPI(query).catch(console.error);
  }
  const callAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();
    console.log(json)
    if(json == null) {
      alert("Something went wrong with querying!")
    }
    else {
      let randomImage = Math.floor(Math.random() * json.info.totalrecordsperquery)
      setCurrentImage(json.records[randomImage].baseimageurl)
      setPrevImages((images) => [...images, json.records[randomImage].baseimageurl])
    }
  }
  
  return (
    <>
    <div className="whole-page">
      <Gallery />
      <div className="container">
        <a href="https://github.com/harvardartmuseums/api-docs/blob/master/README.md">Harvard Art Museums</a>
        {currentImage ? (
          <img
            className="art-image"
            src={currentImage}
            alt="Harvard Art Museum piece"
          />
        ) : (
          <div> </div>
        )}
        <button className="query-button" onClick={makeQuery} />
      </div>
      <BanList />
    </div>
    </>
  )
}

export default App
