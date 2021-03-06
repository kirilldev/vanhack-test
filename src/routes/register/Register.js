/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Register.css';
import CredentialsForm from '../../components/CredentialsForm/CredentialsForm';

class Register extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <br />
          <br />
          <CredentialsForm type="register" />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Register);
