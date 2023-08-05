import React, {useState} from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

export default function Search() {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('searchInput:', searchInput);
    handleSearch(searchInput);
    setSearchInput('')
  };

  const handleSearch = async (searchInput) => {
    try {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}`);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error)
    } 
  }


  return (
    <Row>
      <Col xs={12} md={6}>
        <Form onSubmit={handleSubmit} className="search-form">
          <Form.Control 
          type="search"
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          ></Form.Control>
          <Button variant="primary" type="submit" name="searchInput">
            Search
          </Button>
        </Form>
      </Col>
      <Col xs={12} md={6}>
        results
      </Col>
    </Row>
  );
}
