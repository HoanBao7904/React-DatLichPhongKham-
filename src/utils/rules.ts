import * as yup from 'yup'

export const Loginschema = yup.object({
  userName: yup
    .string()
    .required('Tên đăng nhập không để trống')
    .min(4, 'Độ dài 4 - 50 kí tự')
    .max(50, 'Độ dài 4 - 50 kí tự'),
  password: yup
    .string()
    .required('mật khẩu không để trống')
    .min(6, 'Độ dài 6 - 50 kí tự')
    .max(50, 'Độ dài 4 - 50 kí tự')
})
export const schema = yup
  .object({
    email: yup
      .string()
      .required('Email không được để trống')
      .email('Email không hợp lệ')
      .min(5, 'Độ dài 5 -100 kí tự')
      .max(160, 'Độ dài 5 -100 kí tự'),
    phone: yup
      .string()
      .required('Số điện thoại không được để trống')
      .matches(/^(0|\+84)[0-9]{9}$/, 'Số điện thoại không hợp lệ'),
    userName: yup
      .string()
      .required('Tên đăng nhập không được để trống')
      .min(4, 'Độ dài 4 - 20 kí tự')
      .max(20, 'Độ dài 4 - 20 kí tự'),
    password: yup
      .string()
      .required('Mật khẩu không được để trống')
      .min(6, 'Độ dài 6 - 50 kí tự')
      .max(50, 'Độ dài 4 - 50 kí tự'),
    fullName: yup
      .string()
      .required('Họ và tên không được để trống')
      .min(5, 'Độ dài 2 - 50 kí tự')
      .max(60, 'Độ dài 2 - 50 kí tự')
    // confirm_password: yup
    //   .string()
    //   .required('mật khẩu xác thuật không để trống')
    //   .min(6, 'Độ dài 6 - 50 kí tự')
    //   .max(50, 'Độ dài 4 - 50 kí tự')
    //   .oneOf([yup.ref('password')], 'Mật khẩu không trùng khớp')
  })
  .required()

export const profileSchema = yup.object({
  fullName: yup.string().max(200, 'độ dài tối đa 200 kí tự').required(),
  phone: yup.string().max(10, 'độ dài tối đa 10 kí tự').required(),
  address: yup.string().max(1000, 'độ dài tối đa 1000 kí tự').required(),
  dateOfBirth: yup.date().max(new Date(), 'hãy chọn ngày trong quá khứ').required(),
  userName: yup.string().max(60, 'độ dài tối đa 60 kí tự').required(),
  email: yup
    .string()
    .required('Email không được để trống')
    .email('Email không hợp lệ')
    .min(5, 'Độ dài 5 -100 kí tự')
    .max(160, 'Độ dài 5 -100 kí tự')
})

export type Schema = yup.InferType<typeof schema> // dùng kiểu dữ liệu này hay fromRegister

export interface loginSchema {
  userName: string
  password: string
}
