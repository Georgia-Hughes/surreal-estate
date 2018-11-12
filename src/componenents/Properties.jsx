import React from 'react';
import axios from 'axios';
import CardGrid from './CardGrid';
import '../styles/properties.scss';
import { Link } from 'react-router-dom';
import qs from 'qs';

class AddProperty extends React.Component {
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
          <form className="search" onSubmit={this.handleSearch}>
            <input
              type="text"
              className="searchBox"
              value={this.state.search}
              onChange={event => this.setState({ search: event.target.value })}
            />
            <button className="searchButton" type="submit"><i className="fas fa-search" /></button>
          </form>
          <div className="filterTitle">Filter by city:</div>
          <Link to={this.buildQueryString('query', { city: 'Manchester' })} className="link-black">Manchester</Link>
          <Link to={this.buildQueryString('query', { city: 'Salford' })} className="link-black">Salford</Link>
          <div className="filterTitle">Sort by:</div>
          <Link to={this.buildQueryString('sort', { price: 1 })} className="link-black">Price Ascending</Link>
          <Link to={this.buildQueryString('sort', { price: -1 })} className="link-black">Price Descending</Link>
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

export default AddProperty;
