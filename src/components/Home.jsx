import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import RecommendationResults from "./RecommendationResults";
import SearchResults from "./SearchResults";

export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState("");
  const [searchSelect, setSearchSelect] = useState("track");

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
          type: searchSelect,
        },
      });
      setSearchData(response.data);
      // console.log('genre', searchData);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const handleSelectedTrack = (e) => {
    e.preventDefault();
    const trackId = e.currentTarget.getAttribute("data-id");
    setSelectedTrack(trackId);
    setSearchData([]);
  };

  const handleSearchSelect = (e) => {
    e.preventDefault();
    const selectOption = e.target.value;
    setSearchSelect(selectOption);
  };

  handleSearch();

  return (
    <Row className="header-row">
      <Col xs={12} md={6} className="search-col">
        <Form className="search-form">
          <Form.Control
            type="search"
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
        </Form>
        <Form.Select
          className="search-select"
          aria-label="Default select example"
          onChange={handleSearchSelect}
        >
          <option value="track">Track</option>
          <option value="artist">Artist</option>
          <option value="album">Album</option>
        </Form.Select>
        <SearchResults
          searchData={searchData}
          handleSelectedTrack={handleSelectedTrack}
          searchSelect={searchSelect}
        />
      </Col>
      <Col xs={12} md={6}>
        <RecommendationResults
          selectedTrack={selectedTrack}
          accessToken={accessToken}
          searchInput={searchInput}
          searchSelect={searchSelect}
        />
      </Col>
    </Row>
  );
}
