// src/api/user.ts
import { poster, putter, deleter } from '@/api/fetchers'
// import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

const API_BASE_URL = 'http://localhost:4000/users'

export const useRegisterUser = () => {
  const { trigger, isMutating, error, data, reset } = useSWRMutation(`${API_BASE_URL}/register`, poster)
  return { trigger, isMutating, error, data, reset }
}

export const useLoginUser = () => {
  const { trigger, isMutating, error, data, reset } = useSWRMutation(`${API_BASE_URL}/login`, poster)
  return { trigger, isMutating, error, data, reset }
}

export const useUpdateUserProfile = (userId: string) => {
  const { trigger, isMutating, error, data, reset } = useSWRMutation(`${API_BASE_URL}/${userId}`, putter)
  return { trigger, isMutating, error, data, reset }
}

export const useAddFriend = (userId: string) => {
  const { trigger, isMutating, error, data, reset } = useSWRMutation(`${API_BASE_URL}/${userId}/friends`, poster)
  return { trigger, isMutating, error, data, reset }
}

export const useRemoveFriend = (userId: string) => {
  const { trigger, isMutating, error, data, reset } = useSWRMutation(`${API_BASE_URL}/${userId}/friends`, deleter)
  return { trigger, isMutating, error, data, reset }
}
