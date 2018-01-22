const MongoConf = require('../MongoConf.js');
const ObjectID = require('mongodb').ObjectID;
const Article = require('../models/Article.js');

const getCollection = () =>
  MongoConf.getForumDatastore().then(db => db.collection('Article'));

const castToType = dbObject =>
  dbObject ? Object.assign(new Article(), dbObject) : null;

const ArticleDao = {};

ArticleDao.save = function save(article) {
  return getCollection()
    .then(col => col.insertOne(article))
    .then(res => castToType(res.ops[0]));
};

ArticleDao.incrementComments = function (id) {
  const updateOperations = {
    $inc: {
      comments: 1,
    },
  };

  return getCollection()
    .then(col => col.updateOne({_id: ObjectID(id)}, updateOperations));
};

ArticleDao.findById = function (id) {
  return getCollection()
    .then(col => col.findOne({_id: ObjectID(id)}))
    .then(res => castToType(res));
};

ArticleDao.getAll = function get() {
  return getCollection().then(col => col.find({}).toArray());
};

module.exports = ArticleDao;
