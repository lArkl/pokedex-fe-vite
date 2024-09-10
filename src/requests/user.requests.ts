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
  return pokeApi.post<ResponseDto<UserDto>>('/user', fields)
}

export const updateUserRequest = async (fields: { firstname: string; lastname: string; email: string }) => {
  console.log('fields', fields)
  return pokeApi.patch<ResponseDto<UserDto>>('/user', fields)
}

export const getUserInfoRequest = async (signal?: AbortSignal) => {
  return pokeApi.get<ResponseDto<UserDto & { expiration: string }>>('/user', {
    signal,
  })
}

export const logoutSessionRequest = async (signal?: AbortSignal) => {
  return pokeApi.post<ResponseDto<UserDto>>('/auth/logout', {
    signal,
  })
}
