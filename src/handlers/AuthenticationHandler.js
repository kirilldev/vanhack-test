import jwt from 'jsonwebtoken';
import config from '../config';
import Account from '../data/models/Account';
import AccountDao from '../data/dao/AccountDao';

function setTokenCookie(id, res) {
  const expiresIn = 60 * 60 * 24 * 90; // 90 days

  const token = jwt.sign({_id: id}, config.auth.jwt.secret, {
    expiresIn,
  });

  res.cookie('id_token', token, {
    maxAge: 1000 * expiresIn,
    httpOnly: true,
  });
}

class AuthenticationHandler {
  static register(req, res) {
    const {username, password} = req.body;

    if (!username || !password) {
      throw new Error('Empty email or pass!');
    }

    AccountDao.getByUsername(username).then(account => {
      if (account) {
        res.send('Account already exists!');
      } else {
        AccountDao.save(new Account(username, password)).then(newAccount => {
          setTokenCookie(newAccount._id, res);
          res.redirect('/');
        });
      }
    });
  }

  static logout(req, res) {
    res.clearCookie('id_token');
    req.logout();
    res.send('OK');
  }

  static login(req, res) {
    setTokenCookie(req.user._id, res);
    res.redirect('/');
  }
}

export default AuthenticationHandler;
