import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spotify } from "react-spotify-embed";
// import SpotifyPlayer from "react-spotify-player";

export default function RecommendationResults({
  selectedTrack,
  accessToken,
  searchInput,
  searchSelect,
}) {
  const [recommendationData, setRecommendationData] = useState([]);
  const [selectedTrackData, setSelectedTrackData] = useState({});

  useEffect(() => {
    handleGetRecommendations();
    handleSelectedTrack();
  }, [selectedTrack]);

  const handleSelectedTrack = async () => {
    try {
      const url = `https://api.spotify.com/v1/tracks/${selectedTrack}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("selected track", response.data);
      setSelectedTrackData(response.data);
    } catch (error) {
      // console.error("Error searching:", error);
    }
  };

  const handleGetRecommendations = async () => {
    try {
      const url = "https://api.spotify.com/v1/recommendations";
      let seedParam;
      switch (searchSelect) {
        case "track":
          seedParam = "seed_tracks";
          break;
        case "artist":
          seedParam = "seed_artists";
          break;
        case "album":
          seedParam = "seed_albums";
          break;
        default:
          break;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          seedParam: selectedTrack,
          // seed_artists: '4m4SfDVbF5wxrwEjDKgi4k',
          type: { searchSelect },
          // type: 'artist',
          limit: 20,
        },
      });
      setRecommendationData(response.data);
      console.log("recommendations", response.data);
    } catch (error) {
      // console.error("Error searching:", error);
    }
  };

  if (recommendationData.tracks === undefined) {
    // Data is still being fetched or is not available
    return <div>Loading...</div>;
  }

  switch (searchSelect) {
    case "track":
      return (
        <div>
          <div className="selected-track">
            <p>Recommended tracks similar to</p>
            <p>
              <Spotify link={selectedTrackData.external_urls.spotify} />
            </p>
          </div>
          <ul className="recommendations-ul">
            {recommendationData.tracks.map((track, index) => (
              <li key={index}>
                <Spotify
                  wide
                  link={track.external_urls.spotify}
                  style={{ height: "100px" }}
                />
              </li>
            ))}
          </ul>
        </div>
      );
    case "artist":
      return <p>artist recommedations</p>;
    case "album":
      return <p>album recommedations</p>;
    default:
      return null;
  }
}
