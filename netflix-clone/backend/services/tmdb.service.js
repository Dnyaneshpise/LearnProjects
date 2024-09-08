import axios from 'axios';

export const fetchFromTMDB = async (url) => {

    const options = {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + ENV_VARS.TMDB_API_KEY
        }
      };
    
    await axios.get(url, options);

      if (response.status !== 200) {
        console.error(`Failed to fetch data from ${url}`+response.statusText);
        return;
      }

    return response.data;
}


  
  fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));