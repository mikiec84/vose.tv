import React from 'react';
import PropTypes from 'prop-types';

const Logo = ({ color }) => (
  <svg className="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 34">
    <path
      fill={color || 'white'}
      d="M0 7l11 22h5L27 7h-8l-5.5 12L8 7H0zm121 0l11 22h5l11-22h-8l-5.5 12L129 7h-8zM69.5 8.2c-2.2-1.3-4.7-2-7.3-1.9-2.4 0-4.8.7-6.6 2.3a6.8 6.8 0 0 0-2.1 5c0 1.5.5 3 1.5 4s2.3 1.6 3.6 2l1.8.6c.7.1 1.4.4 2.1.8.5.2.8.7.8 1.2 0 .6-.3 1.1-.7 1.5a4 4 0 0 1-2.3.5c-1 0-2-.3-2.9-.7-.9-.5-1.7-1-2.4-1.7l-3 4.8a13 13 0 0 0 9 3.2c2.6.2 5.2-.8 7.1-2.5a8 8 0 0 0 2.3-5.8c0-1.6-.6-3.1-1.7-4.2-1-.9-2.3-1.5-3.7-2l-1.8-.5-2.2-.7c-.4-.2-.6-.6-.6-1s.1-.7.4-1a3 3 0 0 1 2-.6 8 8 0 0 1 3.9 1.2l2.8-4.5zm23.4 1.4a11.6 11.6 0 0 0-8.7-3.3c-3.2-.1-6.2 1-8.5 3.2a12.5 12.5 0 0 0-3.3 8.7c0 3.1 1.1 6.1 3.3 8.4 2.6 2.6 5.5 3.2 8.8 3.2a13 13 0 0 0 6.9-1.7 10 10 0 0 0 4.3-5.5L89 22c-.3.7-1 1.3-1.6 1.8-.9.4-1.9.6-2.9.6-1.3 0-2.6-.4-3.6-1.4a6 6 0 0 1-1.3-3.7H96v-.8c.1-3.2-1-6.4-3.1-8.9zM79.7 15a5.2 5.2 0 0 1 8.3-2.6c.7.8 1.2 1.7 1.4 2.6h-9.7zM109 0h7v7h5v6h-5v16h-7V13h-2V7h2V0zm-6.5 30c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5zm-64 0C32 30 26 25 26 18S32 6 38.5 6 51 11 51 18s-6 12-12.5 12zm0-6c3 0 5.4-2.7 5.4-6s-2.4-6-5.4-6c-3 0-5.5 2.7-5.5 6s2.4 6 5.5 6z"
    />
  </svg>
);

Logo.propTypes = {
  color: PropTypes.string,
};

export default Logo;
