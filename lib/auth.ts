// Simple auth helper - stores admin password hash
const ADMIN_PASSWORD_HASH = "admin123" // In production, use proper hashing

export const verifyAdminPassword = (password: string): boolean => {
  return password === ADMIN_PASSWORD_HASH
}

export const generateAdminToken = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}
