import React from "react";

export default function SearchResults({
  searchData,
  handleSelectedTrack,
  searchSelect,
}) {
  switch (searchSelect) {
    case "track":
      if (!searchData || !searchData.tracks || !searchData.tracks.items) {
        return null;
      }
      return (
        <ul className="search-results-ul">
          {searchData.tracks.items.map((item) => (
            <li key={item.id} data-id={item.id} onClick={handleSelectedTrack}>
              <p>{item.name}</p>
              {item.artists.map((artist, index) => (
                <p key={index}>{artist.name}</p>
              ))}
            </li>
          ))}
        </ul>
      );
    case "artist":
      if (!searchData || !searchData.artists || !searchData.artists.items) {
        return null;
      }
      return (
        <ul className="search-results-ul">
          {searchData.artists.items.map((artist) => (
            <li data-id={artist.id} onClick={handleSelectedTrack} key={artist.id}>{artist.name}</li>
          ))}
        </ul>
      );
    case "genre":
      if (!searchData || !searchData.genres || !searchData.genres.items) {
        return null;
      }
      return (
        <ul className="search-results-ul">
          {searchData.genres.items.map((genre) => (
            <li data-id={genre.id} onClick={handleSelectedTrack} key={genre.id}>{genre.name}</li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}
