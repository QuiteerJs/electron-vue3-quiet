export const enum StoreKey {
  TokenKey = 'access_token',
  UserKey = 'user_info'
}

export const getToken = () => localStorage.getItem(StoreKey.TokenKey)

export const setToken = token => localStorage.setItem(StoreKey.TokenKey, token)

export const getUserInfo = () => localStorage.getItem(StoreKey.UserKey)

export const setUserInfo = userInfo => localStorage.setItem(StoreKey.UserKey, userInfo)

export const remove = () => {
  localStorage.removeItem(StoreKey.TokenKey)
  localStorage.removeItem(StoreKey.UserKey)
}
