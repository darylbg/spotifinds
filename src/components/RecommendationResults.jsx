import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
      // console.log(response.data);
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
          limit: 20
        },
      });
      setRecommendationData(response.data);
    } catch (error) {
      // console.error("Error searching:", error);
    }
  };

  
  // play track

  if (recommendationData.tracks === undefined) {
    // Data is still being fetched or is not available
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>
        <span>Recommended tracks similar to: {selectedTrackData.name} by </span>
        {selectedTrackData.artists && selectedTrackData.artists.map((artist, index) => (
          <span key={index}>{artist.name}</span>
        ))}
        </p>
      <ul className='recommendations-ul'>
        {recommendationData.tracks.map((track, index) => (
          <li key={index}>
            {track.name}
            {track.artists.map((artist, index) => (
              <p key={index}>{artist.name}</p>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
