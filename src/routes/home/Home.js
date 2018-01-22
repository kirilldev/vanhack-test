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
import s from './Home.css';
import Feedback from '../../components/Feedback/Feedback.js';
import articleService from '../../service/articleService';

class Home extends React.Component {
  // static propTypes = {
  //   news: PropTypes.arrayOf(
  //     PropTypes.shape({
  //       title: PropTypes.string.isRequired,
  //       link: PropTypes.string.isRequired,
  //       content: PropTypes.string,
  //     }),
  //   ).isRequired,
  // };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      isLoading: true
    };
  }

  componentWillMount() {
    articleService.getArticles().then(state => {
      this.setState(Object.assign(state, {isLoading: false}));
    });
  }

  openPost(post) {
    window.location.href = `/read?post=${post._id}`;
  }

  render() {
    let feed = ''

    if (!this.state.isLoading && !this.state.articles.length) {
      feed = (<span style={{color:'white'}}>No articles yet. Be the first to write an article!</span>)
    } else {
      feed = this.state.articles.map(item => (
        <article
          key={item._id}
          onClick={() => this.openPost(item)}
          className={s.articleItem}
        >
          <h2 className={s.newsTitle}>{item.title}</h2>
          <div style={{color: 'white', float: 'left'}}>
            Comments: {item.comments}
          </div>
          <div
            style={{color: 'white', float: 'left', marginLeft: '20px'}}
          >
            Created: {new Date(item.createdDate).toLocaleString()}
          </div>
        </article>
      ))
    }

    return (
      <div className={s.root}>
        <Feedback />
        <div className={s.container}>
          {feed}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
