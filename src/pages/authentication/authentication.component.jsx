import React from 'react';

import SignIn from '../../components/signin/signin.component';

import './authentication.styles.scss';

const AuthenticationPage = () => (
  <div className='authentication'>
    <SignIn />
  </div>
);

export default AuthenticationPage;