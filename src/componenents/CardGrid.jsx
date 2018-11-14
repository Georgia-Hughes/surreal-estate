import React from 'react';
import '../styles/cardgrid.scss';

const Card = (props) => (
  <article>
    <div className="grey-row">
      {(props.type === 'Flat') ? <i className="fas fa-hotel" /> : <i className="fas fa-home" />}
    </div>
    <div className="details-container">
      <span className="bold">{props.title}</span>
      <div className="place-container">
        <span>{props.type}</span>
        <span> - </span>
        <span>{props.city}</span>
      </div>
      <span><i className="fas fa-bed" /> {props.bedrooms}</span>
      <span><i className="fas fa-bath" /> {props.bathrooms}</span>
      <span>£ {props.price}</span>
    </div>
    <a href={`mailto:${ props.email}`} className="purple-row">
      <i className="far fa-envelope-open" /> Email
    </a>

  </article>
);

export default Card;
