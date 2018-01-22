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
import s from './CredentialsForm.css';

class CredentialsForm extends React.Component {
  static propTypes = {
    type: PropTypes.node.isRequired,
  };

  render() {
    return (
      <form method="post" action={this.props.type}>
        <div className={s.formGroup}>
          <label className={s.label} htmlFor="username">
            Username:
            <input
              required="true"
              className={s.input}
              id="username"
              type="text"
              name="username"
              autoFocus // eslint-disable-line jsx-a11y/no-autofocus
            />
          </label>
        </div>
        <div className={s.formGroup}>
          <label className={s.label} htmlFor="password">
            Password:
            <input
              required="true"
              className={s.input}
              id="password"
              type="password"
              name="password"
            />
          </label>
        </div>
        <div className={s.formGroup}>
          <button className={s.button} type="submit">
            {this.props.type === 'login' ? 'Log in' : 'Sign Up'}
          </button>
        </div>
      </form>
    );
  }
}

export default withStyles(s)(CredentialsForm);
