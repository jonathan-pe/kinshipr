// src/store/authStore.ts
import { create } from 'zustand'

interface AuthState {
  userId: string | null
  setUserId: (userId: string | null) => void
}

const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  setUserId: (userId) => set({ userId }),
}))

export default useAuthStore
