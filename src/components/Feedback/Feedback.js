/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Feedback.css';
import userService from '../../service/userService';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorized: false,
    };
  }

  componentWillMount() {
    userService.getAuthorizedUser().then(user => {
      this.setState({ isAuthorized: user !== null });
    });
  }

  render() {
    let newPostLink = (<span />);

    if (this.state.isAuthorized) {
      newPostLink = (
        <a className={s.link} href="/create-post">
          + Create New Post
        </a>
      );
    }

    return (
      <div className={s.root}>
        <div className={s.container}>
          <input placeholder="Search" className={s.searchInput}/>
          {newPostLink}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Feedback);
