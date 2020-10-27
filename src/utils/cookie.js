import Cookie from 'js-cookie';
import isNil from 'lodash/isNil';

function isLogin() {
  return !isNil(Cookie.get('user'));
}

function getUser() {
  return JSON.parse(Cookie.get('user'));
}

function login(user) {
  Cookie.set('user', JSON.stringify(user));
}

function logout() {
  Cookie.remove('user');
}

export { isLogin, getUser, login, logout };
