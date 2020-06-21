/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-no-duplicate-props */
import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Image,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prefer-stateless-function
class Display extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        <Container>
          <Row>
            {data.results.map((element) => (
              <Col
                id={element.id}
                key={element.id}
              >
                <Link to={`/${element.id}`}>
                  <div>
                    <Image src={`https://image.tmdb.org/t/p/original/${element.poster_path}`} />
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    );
  }
}

Display.propTypes = {
  data: PropTypes.string.isRequired,
};

export default Display;
