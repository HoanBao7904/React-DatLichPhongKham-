import type { User } from 'src/types/user.type'

// export const saveAccessToken = (access_token: string) => {
//   localStorage.setItem('token', access_token)
// }
export const saveAccessToken = (access_token: string) => {
  // Loại bỏ "Bearer " trước khi lưu để đảm bảo tính nhất quán
  const cleanToken = access_token.replace(/^Bearer\s+/i, '')
  localStorage.setItem('token', cleanToken)
}

export const clearTokenLS = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('profile')
}

export const getAccessToken = () => {
  const token = localStorage.getItem('token')
  if (token) {
    // Loại bỏ "Bearer " nếu có
    return token.replace(/^Bearer\s+/i, '')
  }
  return ''
}

export const getProfile = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

export const setProfile = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}

// export const setProfileLogin = (profile: UserLogin) => {
//   localStorage.setItem('profile', JSON.stringify(profile))
// }

// export const getProfile = () => localStorage.getItem('profile')
