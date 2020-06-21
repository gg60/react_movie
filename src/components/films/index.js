/* eslint-disable max-len */
import React, { Component } from 'react';
import {
  Button,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import axios from 'axios';
import { api } from '../config/key';
import Display from './Display';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select: null,
      data: null,
    };
    this.params = {
      api_key: api,
      language: 'en-US',
      sort_by: 'popularity.desc',
      include_adult: false,
      include_video: false,
      page: 1,
    };
  }

  componentDidMount() {
    axios.get('https://api.themoviedb.org/3/discover/movie?', {
      params: this.params,
    }).then((res) => {
      this.setState({ data: res.data });
    });
  }

  toogleView(theme) {
    axios.get(`https://api.themoviedb.org/3/discover/${theme}`, {
      params: this.params,
    })
      .then((res) => {
        this.setState({ data: res.data });
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { input } = this.state;
    const paramsSubmit = this.params;
    delete paramsSubmit.include_video;
    delete paramsSubmit.sort_by;
    paramsSubmit.query = input;
    axios.get('https://api.themoviedb.org/3/search/movie', {
      params: paramsSubmit,
    })
      .then((res) => {
        this.setState({ data: res.data });
      });
  }

  handleChange(event) {
    this.setState({ input: event.target.value });
  }

  handleChangeSelect(event) {
    this.setState({ select: event.target.value });
    this.displayByGenre(event.target.value);
  }

  displayByGenre(select) {
    const paramsSubmit = this.params;
    paramsSubmit.with_genres = select;
    axios.get('https://api.themoviedb.org/3/discover/movie?', {
      params: paramsSubmit,
    })
      .then((res) => {
        this.setState({ data: res.data });
      });
  }

  topRated() {
    const paramsSubmit = this.params;
    delete paramsSubmit.include_video;
    delete paramsSubmit.sort_by;
    axios.get('https://api.themoviedb.org/3/movie/top_rated', {
      params: paramsSubmit,
    })
      .then((res) => {
        this.setState({ data: res.data });
      });
  }

  render() {
    const {
      data,
      input,
      select,
    } = this.state;

    return (
      <div>
        <div>
          <Button onClick={() => this.toogleView('movie')}>Films</Button>
          <Button onClick={() => this.toogleView('tv')}>Séries</Button>
          <Button onClick={() => this.topRated()}>Top</Button>
          <select value={select} onChange={(event) => this.handleChangeSelect(event)}>
            <option>Categories</option>
            <option value={35}>Comedie</option>
            <option value={28}>Action</option>
            <option value={27}>Horreur</option>
          </select>
        </div>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <InputGroup>
            <FormControl
              placeholder="Chercher un Film"
              value={input}
              onChange={(event) => this.handleChange(event)}
              type="text"
            />
          </InputGroup>
        </form>
        <Display data={data} />
      </div>
    );
  }
}

export default Counter;
