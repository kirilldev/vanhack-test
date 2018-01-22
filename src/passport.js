import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import AccountDao from './data/dao/AccountDao';

/**
 * Sign in with Facebook.
 */
passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    (username, password, done) => {
      AccountDao.getByUsername(username)
        .then(account => {
          if (!account) {
            return done(null, false, {
              message: 'Incorrect username.',
            });
          }

          // TODO: In real life apps we will store hash and salt in db instead of user password
          if (!account.password === password) {
            return done(null, false, {
              message: 'Incorrect password.',
            });
          }

          return done(null, account);
        })
        .catch(e => done(e));
    },
  ),
);

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

// passport.deserializeUser(function(id, done) {
//   AccountDao.findById(id, function(err, user) {
//     done(err, user);
//   });
// });

passport.deserializeUser(function (user, done) {
  console.log('ddddddddddddddddd', user)
  done(null, user);
});

export default passport;
