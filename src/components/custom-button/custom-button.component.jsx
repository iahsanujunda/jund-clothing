import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({
  children,
  isGoggleAuth,
  inverted,
  ...otherProps
}) => (
  <button
    className={
      `${isGoggleAuth ? 'google-auth' : ''}
      ${inverted ? 'inverted' : ''}
      custom-button`
    }
    {...otherProps}
  >
    {children}
  </button>
)

export default CustomButton;