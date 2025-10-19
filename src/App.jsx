import { useState } from 'react'
import './App.css'
import Gallery from "./components/Gallery"
import BanList from "./components/BanList"
function App() {
  const [currentImage, setCurrentImage] = useState(null);
  const [prevImages, setPrevImages] = useState([]);
  const [banList, setBanList] = useState([]);

  const makeQuery = () => {
    let query = `https://api.artic.edu/api/v1/artworks?page=${Math.floor(Math.random() * 10)}&limit=100`;
    callAPI(query).catch(console.error);
  }

  const callAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();

    console.log(json);

    if (!json || !json.data) {
      alert("Oops! Something went wrong with that query, let's try again!");
    } else {
      const filtered_json = json.data.filter((item) => {
        return !banList.some((ban) => {
          return (
            item.artwork_type_title === ban ||
            item.place_of_origin === ban ||
            item.theme_titles?.includes(ban) ||
            item.style_titles?.includes(ban)
          );
        });
      });

      if (filtered_json.length === 0) {
        alert("No artworks available after filtering!");
        return;
      }
      // there are artworks available after filtering through bans
      let random = Math.floor(Math.random() * filtered_json.length);
      setCurrentImage(filtered_json[random]);
      setPrevImages((images) => [filtered_json[random], ...images]);
    }
  }
  
  const handleClick = (e) => {
    const buttonText = e.target.textContent;
    if (!banList.includes(buttonText))
      setBanList((bans) => [...bans, buttonText])
  }

  const banHandleClick = (e) => {
    const buttonText = e.target.textContent;
    setBanList((bans) => bans.filter((ban) => ban !== buttonText))
  }

  return (
    <>
      <div className="whole-page">
        <Gallery images={prevImages}/>
        <div className="center">
          <h1>Random Art Generator</h1>
          <p className="reference">Made possible with <a href="https://api.artic.edu/api/v1/artworks">Art Institute of Chicago</a></p>
          {currentImage ? (
            <>
              <h2>{currentImage.credit_line}</h2>
              <div className="button-container">
                <button className="tag" onClick={handleClick}>{currentImage.artwork_type_title}</button>
                <button className="tag" onClick={handleClick}>{currentImage.place_of_origin}</button>
                {currentImage.theme_titles?.length > 0 && currentImage.theme_titles.filter((theme) => theme.trim() !== "").map((theme) => 
                  <button className="tag" onClick={handleClick} key={theme}>{theme}</button>
                )}
                {currentImage.style_titles?.length > 0 && currentImage.style_titles.filter((theme) => theme.trim() !== "").map((style) => 
                  <button className="tag" onClick={handleClick} key={style}>{style}</button>
                )}
              </div>
              <img
                className="art-image"
                src={`https://www.artic.edu/iiif/2/${currentImage.image_id}/full/843,/0/default.jpg`}
                alt={`${currentImage.credit_line}, a(n) ${currentImage.artwork_type_title} work by ${currentImage.artist_title}`}
              />
            </>
          ) : (
            <div> </div>
          )}
          <button className="query-button" onClick={makeQuery}><b>Generate</b></button>
        </div>
        <BanList bans={banList} onClick={banHandleClick}/>
      </div>
    </>
  )
}

export default App;
