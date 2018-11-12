import React from 'react';

const Alert = ({ message, success }) => (
  <div className={`alert${success ? ' success' : ' error'}`}>
    {message}
  </div>
);

export default Alert;
