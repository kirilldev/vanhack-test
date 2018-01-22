import Article from '../data/models/Article';
import ArticleDao from '../data/dao/ArticleDao';
import CommentsDao from '../data/dao/CommentsDao';
import AccountDao from '../data/dao/AccountDao';

class ArticleHandler {
  static getAll(req, res) {
    ArticleDao.getAll().then(all => {
      res.json({
        articles: all,
      });
    });
  }

  static getById(req, res) {
    const id = req.params.id;

    Promise.all([ArticleDao.findById(id), CommentsDao.findByPostId(id)]).then(
      ([article, comments]) => {
        res.json({
          article,
          comments,
        });
      },
    );
  }

  static createNew(req, res) {
    const { postBody = '', postTitle = '' } = req.body;
    const user = req.user;

    if (!postBody.trim() && !postTitle.trim()) {
      throw new Error('Post must have body and title!');
    }

    ArticleDao.save(new Article(postTitle, postBody, user._id))
      .then(article => CommentsDao.createDefaults(article._id))
      .then(_ => res.redirect('/'));
  }

  static comment(req, res) {
    const { text = '' } = req.body;
    const postId = req.params.id;
    const comment = {
      authorId: req.user._id,
      text,
    };

    if (!text.trim()) {
      throw new Error('Text cant be empty!');
    }

    AccountDao.findById(req.user._id).then(account => {
      comment.username = account.username;

      Promise.all([
        CommentsDao.addOne(postId, comment),
        ArticleDao.incrementComments(postId),
      ]).then(([comments]) => {
        console.log(comments)
        res.json(comments);
      });
    });
  }
}

export default ArticleHandler;
