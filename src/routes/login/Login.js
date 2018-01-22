import React from 'react';
import CredentialsForm from '../../components/CredentialsForm/CredentialsForm';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Login.css';

class Login extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <br />
          <br />
          <CredentialsForm type="login" />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Login);
