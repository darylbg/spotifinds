import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spotify } from "react-spotify-embed";
// import SpotifyPlayer from "react-spotify-player";

export default function RecommendationResults({ selectedTrack, accessToken }) {
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
      console.log(response.data);
      setSelectedTrackData(response.data);
    } catch (error) {
      // console.error("Error searching:", error);
    }
  };

  const handleGetRecommendations = async () => {
    try {
      const url = "https://api.spotify.com/v1/recommendations";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          seed_tracks: selectedTrack,
          type: "track",
          limit: 20,
        },
      });
      setRecommendationData(response.data);
    } catch (error) {
      // console.error("Error searching:", error);
    }
  };

  if (recommendationData.tracks === undefined) {
    // Data is still being fetched or is not available
    return <div>Loading...</div>;
  }

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
            {/* {track.name}
            {track.artists.map((artist, index) => (
              <p key={index}>{artist.name}</p>
            ))} */}
            <Spotify 
            wide 
            link={track.external_urls.spotify} 
            style={{height: '100px'}}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
