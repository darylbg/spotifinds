import React from 'react';


export default function SearchResults({ searchData, handleSelectedTrack }) {
  if (!searchData || !searchData.tracks || !searchData.tracks.items) {
    // Return some placeholder content or null if searchData or its properties are not available
    return null;
  }

  return (
    <ul className='search-results-ul'>
      {searchData.tracks.items.map((item) => (
        <li key={item.id} data-id={item.id} onClick={handleSelectedTrack}>
            <p>{item.name}</p>
            {item.artists.map((artist, index) => (
                <p key={index}>{artist.name}</p>
                ))}
        </li>
      ))}
    </ul>
  )
}
