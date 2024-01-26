export const getUserToken = () => {
  return localStorage.getItem('token')
}

export const setUserToken = (token: string) => {
  localStorage.setItem('token', token)
}
