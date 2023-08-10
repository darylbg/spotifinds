import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import RecommendationResults from "./RecommendationResults";
import SearchResults from "./SearchResults";

export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState('');

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   handleSearch();
  //   // setSearchInput("");
  // };

  const client_id = process.env.REACT_APP_CLIENT_ID;
  const client_secret = process.env.REACT_APP_CLIENT_SECRET;

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const response = await axios.post(
          "https://accounts.spotify.com/api/token",
          "grant_type=client_credentials",
          {
            headers: {
              Authorization: `Basic ${btoa(`${client_id}:${client_secret}`)}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        setAccessToken(response.data.access_token);
      } catch (error) {
        console.error("Error getting access token:", error);
      }
    };

    getAccessToken();
  }, []);

  const handleSearch = async () => {
    try {
      const url = "https://api.spotify.com/v1/search";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          q: searchInput,
          type: "track",
        },
      });
      setSearchData(response.data);
      // console.log(searchData);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };
  handleSearch();

  const handleSelectedTrack = (e) => {
    e.preventDefault();
    const trackId = e.currentTarget.getAttribute('data-id');
    setSelectedTrack(trackId);
    setSearchData([]);
  }

  return (
    <Row>
      <Col xs={12} md={6}>
        <Form 
        // onSubmit={handleSubmit} 
        className="search-form"
        >
          <Form.Control
            type="search"
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
          
          {/* <Button variant="primary" type="submit">
            Search
          </Button> */}
        </Form>
        <SearchResults searchData={searchData} handleSelectedTrack={handleSelectedTrack}/>
      </Col>
      <Col xs={12} md={6}>
        <RecommendationResults selectedTrack={selectedTrack} accessToken={accessToken}/>
      </Col>
    </Row>
  );
}
