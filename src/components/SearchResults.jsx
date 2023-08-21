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
            <li className="search-results-tracks" key={item.id} data-id={item.id} onClick={handleSelectedTrack}>
              <h3>{item.name}</h3>
              {item.artists.map((artist, index) => (
                <h6 key={index}>{artist.name}</h6>
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
    case "album":
      if (!searchData || !searchData.albums || !searchData.albums.items) {
        return null;
      }
      return (
        <ul className="search-results-ul">
          {searchData.albums.items.map((album) => (
            <li data-id={album.id} onClick={handleSelectedTrack} key={album.id}>{album.name}</li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}
