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
    let query = ``
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
      setPrevImages((images) => [...images, {"url": json.records[randomImage].baseimageurl, "desc": "description"}])
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
              src={currentImage}
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
