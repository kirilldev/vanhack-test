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
import s from './Read.css';
import articleService from '../../service/articleService';
import userService from '../../service/userService';

class Read extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {},
      comments: [],
      userId: null,
      commentText: '',
    };
  }

  _commentsToSortedArray(commentsSet) {
    return Object.keys(commentsSet)
      .map(k => {
        commentsSet[k].timestamp = Number(k);
        return commentsSet[k];
      })
      .sort((a, b) => a.timestamp - b.timestamp);
  }

  componentWillMount() {
    articleService.getArticle(this.props.postId).then(state => {
      this.setState({
        article: state.article,
        comments: this._commentsToSortedArray(state.comments.comments),
      });
    });

    userService.getAuthorizedUser().then(user => {
      const userId = user !== null ? user._id : null;
      this.setState({userId});
    });
  }

  handleChange(event) {
    this.setState({commentText: event.target.value});
  }

  addComment() {
    articleService
      .comment(this.state.commentText, this.props.postId)
      .then(res => {
        console.log(this._commentsToSortedArray(res.comments));

        this.setState({
          commentText: '',
          comments: this._commentsToSortedArray(res.comments)
        });
      });
  }

  render() {
    let commentForm = '';

    if (this.state.userId !== null) {
      commentForm = (
        <div style={{marginTop: '20px'}}>
          <label style={{color: 'white'}} htmlFor="postComment">
            Do you have what to say?
          </label>
          <textarea
            placeholder="Start typing your text. Max comment length is 160 characters"
            className={s.textArea}
            maxLength="160"
            id="postComment"
            value={this.state.commentText}
            onChange={this.handleChange.bind(this)}
          />
          <button className={s.button} onClick={this.addComment.bind(this)}>
            Add comment
          </button>
        </div>
      );
    }

    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.article}>
            <h2 className={s.articleHeader}>{this.state.article.title}</h2>
            <div>{this.state.article.body}</div>
          </div>

          {this.state.comments.map(item => (
            <div key={item.timestamp} className={s.comment}>
              <h4 className={s.commentTitle}>
                {item.username} wrote at {new Date(item.timestamp).toLocaleString()}:
              </h4>
              <div style={{color: 'white'}}>{item.text}</div>
            </div>
          ))}
          {commentForm}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Read);
