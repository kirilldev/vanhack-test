const {MongoClient} = require('mongodb');
const config = require('../config');

const MongoConf = {};

let dataStorePromise = null;

MongoConf.getForumDatastore = function getForumDatastore() {
  if (dataStorePromise) {
    return dataStorePromise;
  }

  dataStorePromise = new Promise((resolve, reject) => {
    MongoClient.connect(config.databaseUrl, (err, db) => {
      if (err) {
        reject(err);
      }
      resolve(db);
    });
  });

  return dataStorePromise;
};

module.exports = MongoConf;
