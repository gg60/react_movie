/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Image,
} from 'react-bootstrap';
import axios from 'axios';
import { api } from '../config/key';

class filmDetails extends Component {
  constructor(props) {
    super(props);
    this.params = {
      api_key: api,
      language: 'en-US',
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      params: this.params,
    })
      .then((res) => {
        this.setState({ data: res.data });
      });
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <Row>
          <Col>
            <Image src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`} />
          </Col>
        </Row>
        <Container>
          <Row>
            <Col>
              <h1>{data.original_title}</h1>
              <p>{data.release_date}</p>
              <p>{data.overview}</p>
              <a href={data.homepage}>Home</a>
            </Col>
            <Col>
              <Image src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default filmDetails;
