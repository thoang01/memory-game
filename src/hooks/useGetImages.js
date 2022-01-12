import { useState, useEffect } from "react";
const getRandomPage = () => Math.round(Math.random() * (10-1) + 1)

const useGetImages = (gameOptions) => {
  const [images, setImages] = useState([])

  const buildURL = () => {
    let url = new URL('https://api.pexels.com/v1/search')
    url.search = new URLSearchParams({
      query: gameOptions.selectCategory,
      orientation: 'square',
      size: 'small',
      per_page: gameOptions.cardsCount / 2,
      page: getRandomPage()
    })
    return url
  }
  const fetchPicture = () => {
    fetch(buildURL(), {
      headers: {
        Authorization: process.env.REACT_APP_AUTH_KEY,
      }
    }).then(data => data.json())
    .then(data => setImages(data.photos))
  }

  useEffect(() => {
    if (!gameOptions) return
    fetchPicture();
  }, [gameOptions])

  return images;
};

export default useGetImages;
