class Article {
  constructor(
    title = null,
    body = null,
    author = null,
    createdDate = Date.now(),
  ) {
    this._id = undefined; // eslint-disable-line
    this.title = title;
    this.body = body;
    this.createdDate = createdDate;
    this.author = author;
    this.comments = 0;
  }
}

module.exports = Article;
