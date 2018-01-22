/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';
import Navigation from '../Navigation';

class Header extends React.Component {
  static propTypes = {
    title: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Navigation />
          <Link className={s.brand} to="/">
            <span className={s.brandTxt}>VanHack Forum</span>
          </Link>
          <div className={s.banner}>
            <h2 className={s.bannerTitle}>{this.props.title}</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Header);
