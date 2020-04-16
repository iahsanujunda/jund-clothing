import React from 'react';

import SignIn from '../../components/signin/signin.component';
import SignUp from '../../components/signup/signup.component';

import './authentication.styles.scss';

const AuthenticationPage = () => (
  <div className='authentication'>
    <SignIn />
    <SignUp />
  </div>
);

export default AuthenticationPage;