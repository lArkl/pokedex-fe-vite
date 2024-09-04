import { ResponseDto, UserDto } from './dto'
import { pokeApi } from './utils'

export const signInUserRequest = async (fields: { email: string; password: string }) => {
  return pokeApi.post<ResponseDto<UserDto>>('/auth/signin', fields)
}

export const signUpUserRequest = async (fields: {
  firstname: string
  lastname: string
  email: string
  password: string
}) => {
  return pokeApi.post<ResponseDto<UserDto>>('/users/signup', fields)
}

export const getUserInfoRequest = async (signal?: AbortSignal) => {
  return pokeApi.get<ResponseDto<UserDto & { expiration: string }>>('/users/info', {
    signal,
  })
}

export const logoutSessionRequest = async (signal?: AbortSignal) => {
  return pokeApi.post<ResponseDto<UserDto>>('/auth/logout', {
    signal,
  })
}
