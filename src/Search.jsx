import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import Results from "./Results";

export default function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [searchData, setSearchData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("searchInput:", searchInput);
    // handleSearch(searchInput);
    setSearchInput("");
  };

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
        console.log('access_token', response.data.access_token);
      } catch (error) {
        console.error("Error getting access token:", error);
      }
    };

    getAccessToken();
  }, []);
  
//   let searchData = [];
  const handleSearch = async () => {
    try {
      const url = "https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setSearchData(response.data);
      console.log(searchData);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      handleSearch();
    }
  }, [accessToken]);

  return (
    <Row>
      <Col xs={12} md={6}>
        <Form onSubmit={handleSubmit} className="search-form">
          <Form.Control
            type="search"
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
          <Button variant="primary" type="submit">
            Search
          </Button>
        </Form>
      </Col>
      <Col xs={12} md={6}>
        <Results searchData={searchData}/>
      </Col>
    </Row>
  );
}
