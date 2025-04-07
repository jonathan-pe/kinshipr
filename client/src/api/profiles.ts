// src/api/user.ts
import { getter, putter } from '@/api/fetchers'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

const API_BASE_URL = 'http://localhost:4000/profiles'

export const useUserProfile = (userId: string) => {
  const { data, error, mutate, isLoading, isValidating } = useSWR(userId ? `${API_BASE_URL}/${userId}` : null, getter)
  return { data, error, mutate, isLoading, isValidating }
}

export const useUpdateUserProfile = (userId: string | undefined | null) => {
  const { data, error, trigger, isMutating, reset } = useSWRMutation(
    userId ? `${API_BASE_URL}/${userId}` : null,
    putter
  )

  return { data, error, trigger, isMutating, reset }
}
