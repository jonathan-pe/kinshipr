export interface ClerkError extends Error {
  clerkError: boolean
  clerkTraceId?: string
  status: number
  errors: {
    code: string
    longMessage: string
    message: string
    meta: {
      paramName?: string
      sessionId?: string
      emailAddresses?: string[]
      identifiers?: string[]
      zxcvbn?: string
    }
  }[]
}

export function isClerkError(error: unknown): error is ClerkError {
  return (error as ClerkError).clerkError !== undefined
}
