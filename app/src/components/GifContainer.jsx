/* 
This component is meant to display gifs. However, there are two different sets of gifs that this component can display, depending on the user's actions. At first, they should see trending gifs but after submitting a search term in the GifSearch form, they should see gifs related to their search.

TODO:
- use the getTrendingGifs adapter to fetch trending gifs on the first render
- each time the user submits the form in GifSearch, use the getGifsBySearch adapter to fetch gifs according to the search term.
- render the list of fetched gifs (or the defaultGifs) as list items with an `img` inside. Remember to give each list item a unique key!
- Bonus: if at any point an error is returned, render the default gifs again.
*/

import { useState, useEffect } from 'react';
import GifSearch from './GifSearch';
import { getTrendingGifs, getGifsBySearch } from '../adapters/giphyAdapters';
import defaultGifs from '../gifs.json';

const GifContainer = () => {
  const [gifs, setGifs] = useState(defaultGifs);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchGifs = async () => {
      if (searchTerm) {
        const searchResults = await getGifsBySearch(searchTerm);
        setGifs(searchResults.length > 0 ? searchResults : defaultGifs);
      } else {
        const trendingGifs = await getTrendingGifs();
        setGifs(trendingGifs.length > 0 ? trendingGifs : defaultGifs);
      }
    };

    fetchGifs();
  }, [searchTerm]);

  return (
    <>
      <GifSearch onSearch={setSearchTerm} />
      <ul>
        {gifs.map((gif) => (
          <li key={gif.id}>
            <img src={gif.images.fixed_height.url} alt={gif.title} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default GifContainer;
