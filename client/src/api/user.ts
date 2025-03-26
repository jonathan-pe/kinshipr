// src/api/user.ts
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:4000/users'

const getter = (url: string) => {
  const token = sessionStorage.getItem('token')
  return axios.get(url, { headers: { Authorization: token ? `Bearer ${token}` : undefined } }).then((res) => res.data)
}

const putter = async (url: string, { arg }: { arg: any }) => {
  const token = sessionStorage.getItem('token')
  return axios
    .put(url, arg, { headers: { Authorization: token ? `Bearer ${token}` : undefined } })
    .then((res) => res.data)
}

const poster = async (url: string, { arg }: { arg: any }) => {
  const token = sessionStorage.getItem('token')
  return axios
    .post(url, arg, { headers: { Authorization: token ? `Bearer ${token}` : undefined } })
    .then((res) => res.data)
}

const deleter = async (url: string) => {
  const token = sessionStorage.getItem('token')
  return axios
    .delete(url, { headers: { Authorization: token ? `Bearer ${token}` : undefined } })
    .then((res) => res.data)
}

export const useRegisterUser = () => {
  const { trigger, isMutating, error, data, reset } = useSWRMutation(`${API_BASE_URL}/register`, poster)
  return { trigger, isMutating, error, data, reset }
}

export const useLoginUser = () => {
  const { trigger, isMutating, error, data, reset } = useSWRMutation(`${API_BASE_URL}/login`, poster)
  return { trigger, isMutating, error, data, reset }
}

export const useUserProfile = (userId: string) => {
  const { data, error, mutate, isLoading, isValidating } = useSWR(userId ? `${API_BASE_URL}/${userId}` : null, getter)
  return { data, error, mutate, isLoading, isValidating }
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
  const { trigger, isMutating, error, data, reset } = useSWRMutation(`${API_BASE_URL}/${userId}/friends/`, deleter)
  return { trigger, isMutating, error, data, reset }
}
