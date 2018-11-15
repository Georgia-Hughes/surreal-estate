import React from 'react';
import axios from 'axios';
import CardGrid from './CardGrid';
import '../styles/properties.scss';
import { Link } from 'react-router-dom';
import qs from 'qs';

class Properties extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      properties: [],
      search: '',
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/v1/PropertyListing/', this.state.properties)
      .then((response) => {
        this.setState({
          properties: response.data,
        });
      });
  }

  componentDidUpdate(prevProps) {
    const { search } = this.props.location;
    if (prevProps.location.search !== search) {
      axios.get(`http://localhost:3000/api/v1/PropertyListing/${search}`)
        .then(({ data: properties }) => this.setState({ properties }))
        .catch(err => console.error(err));
    }
  }

  buildQueryString = (operation, valueObj) => {
    const { location: { search } } = this.props;
    const currentQueryParams = qs.parse(search, { ignoreQueryPrefix: true });
    const newQueryParams = {
      ...currentQueryParams,
      [operation]: JSON.stringify({
        ...JSON.parse(currentQueryParams[operation] || '{}'),
        ...valueObj,
      }),
    };
    return qs.stringify(newQueryParams, { addQueryPrefix: true, encode: false });
  };

  handleSearch = event => {
    event.preventDefault();
    const { search } = this.state;
    const newQueryString = this.buildQueryString('query', { title: { $regex: search } });
    const { history } = this.props;
    history.push(newQueryString);
  };

  render() {
    return (
      <div>
        <aside>
          <div className="search-container">
            <form className="search" onSubmit={this.handleSearch}>
              <input
                type="text"
                className="searchBox"
                value={this.state.search}
                onChange={event => this.setState({ search: event.target.value })}
              />
              <button className="searchButton" type="submit"><i className="fas fa-search" /></button>
            </form>
          </div>
          <div className="search-container">
            <div className="filterTitle">Filter by city:</div>
            <Link to={this.buildQueryString('query', { city: 'Manchester' })} className="link-black">Manchester</Link>
            <Link to={this.buildQueryString('query', { city: 'Leeds' })} className="link-black">Leeds</Link>
            <Link to={this.buildQueryString('query', { city: 'Sheffield' })} className="link-black">Sheffield</Link>
            <Link to={this.buildQueryString('query', { city: 'Liverpool' })} className="link-black">Liverpool</Link>
          </div>
          <div className="search-container">
            <div className="filterTitle">Sort by:</div>
            <Link to={this.buildQueryString('sort', { price: 1 })} className="link-black">Price Ascending</Link>
            <Link to={this.buildQueryString('sort', { price: -1 })} className="link-black">Price Descending</Link>
          </div>
          <div className="search-container">
            <div className="filterTitle">Reset:</div>
            <Link to="/" className="link-black"><i className="fas fa-times" /></Link>
          </div>
        </aside>
        <div className="PropertiesClass">
          {this.state.properties.map((property) => {
            return (
              <CardGrid
                key={property.id}
                title={property.title}
                type={property.type}
                city={property.city}
                bathrooms={property.bathrooms}
                bedrooms={property.bedrooms}
                price={property.price}
                email={property.email}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Properties;
