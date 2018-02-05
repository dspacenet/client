import Cookie from 'js-cookie'

export const getTokenFromCookie = (req) => {
  if (!req.headers.cookie) return
  const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))
  if (!jwtCookie) return
  return jwtCookie.split('=')[1]
}

export const getUserFromServer = async (req, axios) => {
  if (!req.headers.cookie) return {}
  const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))
  if (!jwtCookie) return {}
  const jwt = jwtCookie.split('=')[1]
  axios.setToken(jwt, 'Bearer')
  try {
    const { data } = await axios.get('user')
    return { token: jwt, user: data }
  } catch (error) {
    console.log(error)
    return { }
  }
}

export const getUserFromLocalStorage = () => {
  const json = window.localStorage.user
  return { user: (json ? JSON.parse(json) : {}), token: window.localStorage.getItem('token') }
}

export const setToken = (token, user) => {
  if (process.SERVER_BUILD) return
  window.localStorage.setItem('token', token)
  window.localStorage.setItem('user', JSON.stringify(user))
  Cookie.set('jwt', token)
}

export const unsetToken = () => {
  if (process.SERVER_BUILD) return
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('user')
  Cookie.remove('jwt')
}
