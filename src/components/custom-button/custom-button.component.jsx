import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({ children, isGoggleAuth, ...otherProps }) => (
  <button
    className={
      `${isGoggleAuth ? 'google-auth' : ''} custom-button`
    }
    {...otherProps}
  >
    {children}
  </button>
)

export default CustomButton;