const ADMIN_PASSWORD_HASH = "Shrutika@123"

export const verifyAdminPassword = (password: string): boolean => {
  return password === ADMIN_PASSWORD_HASH
}

export const generateAdminToken = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}
