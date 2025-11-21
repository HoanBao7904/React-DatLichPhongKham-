// //auth chứa những cái interface hoặc những cái type  liên quan tới LOGIN

import type { User } from './user.type'
import type { SuccessResponseApi1 } from './utils.type'

export type LoginResponse = SuccessResponseApi1<{
  token: string
  expiredDate: string
  user: User
}>
