import React from 'react';
import '../styles/addproperty.scss';
import axios from 'axios';
import Alert from '../componenents/Alert';

class AddProperty extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: [{
        title: '',
        type: '',
        bedrooms: 0,
        bathrooms: 0,
        price: 0,
        city: '',
        email: '',
        alertMessage: '',
        isSuccess: false,
        isError: false,
      },
      ],
      error: '',
    };
  }

  resetForm = () => {
    this.setState(() => this.initialState);
  };

  handleAddProperty = (event) => {
    event.preventDefault();

    this.setState({
      alertMessage: '',
      isSuccess: false,
      isError: false,
    });

    if (this.validate()) {
      this.setState({
        error: '',
      });

      axios.post('http://localhost:3000/api/v1/PropertyListing/', this.state.fields)
        .then(() => this.setState({
          isSuccess: true,
          alertMessage: 'Property added.',
        }))
        .catch(() => {
          this.setState({
            alertMessage: 'Property not added. Please try again later.',
            isError: true,
          });
        });
    } else {
      this.setState({
        error: 'The form is invalid',
      });
    }
  };

    handleFieldChange = event => {
      this.setState({
        fields: {
          ...this.state.fields,
          [event.target.name]: event.target.value,
        },
      });
    };

    validate() {
      return this.state.fields.title.length > 4;
    }

    render() {
      return (
        <div className="addProperty">
          <div className="alert alert.success">
            {
              this.state.isSuccess &&
                <Alert message={this.state.alertMessage} success />
            }
            {
              this.state.isError &&
                <Alert message={this.state.alertMessage} />
            }
          </div>
          <h1 style={{ color: 'red' }}>{this.state.error}</h1>
          <form onSubmit={this.handleAddProperty}>
            <div className="row">
              <label>Title:</label>
              <input
                name="title"
                value={this.state.fields.title}
                onChange={this.handleFieldChange}
              />
            </div>
            <div className="row">
              <label>Type:</label>
              <select
                name="type"
                value={this.state.fields.type}
                onChange={this.handleFieldChange}
              >
                <option>Select a Type</option>
                <option value="Flat">Flat</option>
                <option value="Detached">Detached</option>
                <option value="Semi-Detached">Semi-Detached</option>
                <option value="Terraced">Terraced</option>
                <option value="End of Terrace">End of Terrace</option>
                <option value="Cottage">Cottage</option>
                <option value="Bungalow">Bungalow</option>
              </select>
            </div>
            <div className="row">
              <label>City:</label>
              <select
                name="city"
                value={this.state.fields.city}
                onChange={this.handleFieldChange}
              >
                <option>Select a City</option>
                <option value="Manchester">Manchester</option>
                <option value="Leeds">Leeds</option>
                <option value="Sheffield">Sheffield</option>
                <option value="Liverpool">Liverpool</option>
              </select>
            </div>
            <div className="row">
              <label>Bedrooms:</label>
              <select
                name="bedrooms"
                value={this.state.fields.bedrooms}
                onChange={this.handleFieldChange}
              >
                <option>No. of Bedroms</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div className="row">
              <label>Bathrooms:</label>
              <select
                name="bathrooms"
                value={this.state.fields.bathrooms}
                onChange={this.handleFieldChange}
              >
                <option>No. of Bathrooms</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
            <div className="row">
              <label>Price: £</label>
              <input
                name="price"
                type="number"
                value={this.state.fields.price}
                min={0}
                onChange={this.handleFieldChange}
              />
            </div>
            <div className="row">
              <label>Email:</label>
              <input
                name="email"
                type="email"
                value={this.state.fields.email}
                onChange={this.handleFieldChange}
              />
            </div>
            <div className="row">
              <button type="submit">Add</button>
            </div>
          </form>
        </div>
      );
    }
}

export default AddProperty;
