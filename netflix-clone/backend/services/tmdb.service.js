import axios from 'axios';
import { ENV_VARS } from '../config/envVars.js';

export const fetchFromTMDB = async (url) => {

    const options = {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + ENV_VARS.TMDB_API_KEY
        }
      };
    
      try {
        const response = await axios.get(url, options);
    
        if (response.status !== 200) {
          console.error(`Failed to fetch data from ${url}: ${response.statusText}`);
          return;
        }
    
        return response.data;

      } catch (error) {
        console.error(`Error fetching data from ${url}: ${error.message}`);
      }
};
