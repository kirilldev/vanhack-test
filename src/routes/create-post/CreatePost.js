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
import s from './CreatePost.css';

class CreatePost extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <br />
          <br />
          <form method="post" action="/api/article">
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="postTitle">
                Post title
              </label>
              <input
                className={s.input}
                id="postTitle"
                type="text"
                name="postTitle"
                autoFocus // eslint-disable-line jsx-a11y/no-autofocus
              />
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="postBody">
                Post body
              </label>
              <textarea className={s.textArea} id="postBody" name="postBody" />
            </div>
            <div className={s.formGroup}>
              <button className={s.button} type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(CreatePost);
