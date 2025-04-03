// src/api/user.ts
import { getter } from '@/api/fetchers'
import useSWR from 'swr'

const API_BASE_URL = 'http://localhost:4000/profiles'

export const useUserProfile = (userId: string) => {
  const { data, error, mutate, isLoading, isValidating } = useSWR(`${API_BASE_URL}/${userId}`, getter)
  return { data, error, mutate, isLoading, isValidating }
}
