// src/modules/user/userApi.ts
import useSWR from 'swr'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:4000/users'

const fetcher = (url: string, token?: string) =>
  axios.get(url, { headers: { Authorization: token ? `Bearer ${token}` : undefined } }).then((res) => res.data)

export const useRegisterUser = () => {
  const registerUser = async (userData: any) => {
    return axios.post(`${API_BASE_URL}/register`, userData)
  }
  return { registerUser }
}

export const useLoginUser = () => {
  const loginUser = async (credentials: any) => {
    return axios.post(`${API_BASE_URL}/login`, credentials)
  }
  return { loginUser }
}

export const useUserProfile = (userId: string, token: string) => {
  const { data, error, mutate } = useSWR(userId ? [`${API_BASE_URL}/${userId}`, token] : null, fetcher)
  return { data, error, mutate }
}

export const useUpdateUserProfile = (userId: string, token: string) => {
  const updateUserProfile = async (userData: any) => {
    return axios.put(`${API_BASE_URL}/${userId}`, userData, { headers: { Authorization: `Bearer ${token}` } })
  }
  return { updateUserProfile }
}

export const useAddFriend = (userId: string, token: string) => {
  const addFriend = async (friendId: string) => {
    return axios.post(
      `${API_BASE_URL}/${userId}/friends`,
      { friendId },
      { headers: { Authorization: `Bearer ${token}` } }
    )
  }
  return { addFriend }
}

export const useRemoveFriend = (userId: string, token: string) => {
  const removeFriend = async (friendId: string) => {
    return axios.delete(`${API_BASE_URL}/${userId}/friends/${friendId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }
  return { removeFriend }
}
