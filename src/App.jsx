import { useState } from 'react'
import './App.css'

function App() {
  const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
  const [currentImage, setCurrentImage] = useState(null);
  const [prevImages, setPrevImages] = useState([]);
  const [banList, setBanList] = useState();
  const [inputs, setInputs] = useState({
    "classification": "Painting"
  });
  const makeQuery = () => {
    let query = ``
    callAPI(query).catch(console.error);
  }
  const callAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();
    console.log(json)
  }
  makeQuery()
  return (
    <>
    <a href="https://github.com/harvardartmuseums/api-docs/blob/master/README.md">Harvard Art Museums</a>
    </>
  )
}

export default App
