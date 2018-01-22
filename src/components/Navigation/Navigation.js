import React from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Link';
import userService from '../../service/userService';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    userService.getAuthorizedUser().then(user => {
      const userName = user !== null ? user.username : null;
      this.setState({userName});
    });
  }

  handleLogout() {
    userService.logoutUser().then(u => {
      window.location.href = '/';
    });
  }

  render() {
    if (this.state.userName === undefined) {
      return <div className={s.root} role="navigation"/>;
    }

    if (this.state.userName === null) {
      return (
        <div className={s.root} role="navigation">
          <Link className={s.link} to="/login">
            Log in
          </Link>
          <span className={s.spacer}>or</span>
          <Link className={cx(s.link, s.highlight)} to="/register">
            Sign up
          </Link>
        </div>
      );
    }

    return (
      <div className={s.root} role="navigation">
        <span className={s.userName}>Hi, {this.state.userName}!</span>
        <Link className={cx(s.link, s.highlight)} to="" onClick={this.handleLogout.bind(this)}>
          Logout
        </Link>
      </div>
    );
  }
}

export default withStyles(s)(Navigation);
