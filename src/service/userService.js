const storageService = require('./storageService.js');

module.exports = {
  getAuthorizedUser: function getAuthorizedUser() {
    return new Promise(resolve => {
      const user = storageService.get(storageService.keys.authorizedUser);

      if (user) {
        resolve(user);
      } else {
        fetch('/api/user', {
          credentials: 'include',
        })
          .then(resp => resp.json())
          .then(function (o) {
            storageService.set(storageService.keys.authorizedUser, o);
            resolve(o);
          })
          .catch(e => resolve(null));
      }
    });
  },
  logoutUser: function () {
    return fetch('/logout', {
      credentials: 'include',
    }).then(_ => {
      storageService.set(storageService.keys.authorizedUser, null);
    });
  }
};
