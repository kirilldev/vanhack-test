const prefix = 'ForumApp-';

module.exports = {
  keys: {
    authorizedUser: 'AuthorizedUser',
  },

  /**
   *
   * @param k
   * @returns {*}
   */
  get(k) {
    const item = localStorage.getItem(prefix + k);

    try {
      return JSON.parse(item);
    } catch (e) {
      return item;
    }
  },
  set(k, v) {
    localStorage.setItem(prefix + k, JSON.stringify(v));
  },
};
/*

module.exports = function() {
  const service = this;

  const cache = {};

  /!**
   *
   * @param k
   *!/
  service.delete = function(k) {
    const removed = [];

    for (let i = 0; i < arguments.length; i++) {
      cache[arguments[i]] = null;
      removed[i] = localStorage.removeItem(prefix + arguments[i]);
    }

    return arguments.length === 1 ? removed[0] : removed;
  };

  /!**
   *
   * @param k
   * @param v
   *!/


  /!**
   *
   * @param k
   * @param f
   *!/
  service.modify = function(k, f) {
    const o = service.get(k);
    f(o);
    localStorage.setItem(prefix + k, JSON.stringify(o));
  };

  service.getAuthorizedUser = function() {
    return service.get(service.keys.authorizedUser);
  };

  service.setAuthorizedUser = function(user) {
    return service.set(service.keys.authorizedUser, user);
  };

  service.deleteAuthorizedUser = function() {
    return service.delete(service.keys.authorizedUser);
  };

  service.cleanAfterLastUser = function() {
    service.delete(service.keys.lastUser, service.keys.searchCache);
  };
};
*/
