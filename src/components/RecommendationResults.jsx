import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Results({selectedTrack, accessToken}) {
  const [recommendationData, setRecommendationData] = useState([])

useEffect(() =>{
  handleGetRecommendations();
}, [selectedTrack])

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
        },
      });
      setRecommendationData(response.data);
      console.log('recommendation data:', recommendationData);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };
  return (
    <div>
      {selectedTrack}
      <ul>
        {recommendationData && recommendationData}
      </ul>
    </div>
  )
}
