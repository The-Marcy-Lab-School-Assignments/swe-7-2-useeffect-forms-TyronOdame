/* 
An adapter is a helper function for sending a request to specific endpoint. Here, we have one adapter for fetching from the /trending endpoint and another for fetching from the /search endpoint. 

TODO:
- Import the API Key from your config.js file
- Complete each adapter function to fetch from the trending/ and search/ endpoints. See the README for the complete endpoint URLs that you will be fetching from.
*/
import API_KEY from '../config.js';
import { handleFetch } from './handleFetch.js';

const baseUrl = `https://api.giphy.com/v1/gifs`;

// Send a fetch request to the /trending endpoint and return the top 3 results
export const getTrendingGifs = async () => {
  const url = `${baseUrl}/trending?api_key=${API_KEY}&limit=3`;
  try {
    const [data, error] = await handleFetch(url);
    if (error) throw error;
    return data.data;
  } catch (error) {
    console.error('Error fetching trending gifs:', error);
    return [];
  }
};

// Send a fetch request to the /search endpoint with the given term as a query parameter
export const getGifsBySearch = async (term) => {
  const url = `${baseUrl}/search?api_key=${API_KEY}&q=${term}&limit=3`;
  try {
    const [data, error] = await handleFetch(url);
    if (error) throw error;
    return data.data;
  } catch (error) {
    console.error('Error fetching gifs by search term:', error);
    return [];
  }
};
