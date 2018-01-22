module.exports = {
  getArticles: function getArticles() {
    return new Promise(resolve => {
      fetch('/api/article', {
        credentials: 'include',
      }).then(res => res.json()).then(resolve);
    });
  },
  getArticle: function (id) {
    return new Promise(resolve => {
      fetch(`/api/article/${id}`, {
        credentials: 'include',
      }).then(res => res.json()).then(resolve);
    });
  },
  comment: function (text, postId) {
    return fetch(`/api/article/${postId}/comment`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: `text=${text}`
    }).then(res => res.json());
  }
};
