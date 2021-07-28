import Cookies from 'js-cookie'

export const USER_TOKEN_KEY = 'x-auth-token'

export function getToken() {
  return Cookies.get(USER_TOKEN_KEY)
}

export function setToken(token) {
  return Cookies.set(USER_TOKEN_KEY, token)
}

export function removeToken() {
  return Cookies.remove(USER_TOKEN_KEY)
}
