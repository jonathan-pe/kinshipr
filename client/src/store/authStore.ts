// src/store/authStore.ts
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface AuthState {
  userId: string | null
  token: string | null
  setUserId: (userId: string | null) => void
  setToken: (token: string | null) => void
  clearAuth: () => void
}

const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      userId: null,
      token: null,
      setUserId: (userId) => set({ userId }),
      setToken: (token) => set({ token }),
      clearAuth: () => set({ userId: null, token: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)

export default useAuthStore
