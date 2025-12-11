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

// export type SchemaProfileDoctor = yup.InferType<typeof ProfileDoctor>
export const AddSchema = yup
  .object({
    fullName: yup.string().max(200, 'độ dài tối đa 200 kí tự').required(),
    phone: yup.string().max(10, 'độ dài tối đa 10 kí tự').required(),
    dateOfBirth: yup.date().max(new Date(), 'hãy chọn ngày trong quá khứ').required(),
    userName: yup.string().max(60, 'độ dài tối đa 60 kí tự').required(),
    email: yup
      .string()
      .required('Email không được để trống')
      .email('Email không hợp lệ')
      .min(5, 'Độ dài 5 -100 kí tự')
      .max(160, 'Độ dài 5 -100 kí tự'),
    search: yup.string().trim().required('Phải nhập tên bác sĩ'),
    password: yup.string().max(60, 'độ dài tối đa 60 kí tự').required()
  })
  .omit(['search'])

export const ProfileDoctor = yup.object({
  fullName: yup.string().max(200, 'độ dài tối đa 200 kí tự').required('Họ tên không được để trống'),
  email: yup
    .string()
    .required('Email không được để trống')
    .email('Email không hợp lệ')
    .min(5, 'Độ dài 5 - 100 kí tự')
    .max(100, 'Độ dài 5 - 100 kí tự'),
  phone: yup
    .string()
    .required('Số điện thoại không được để trống')
    .matches(/^(0|\+84)\d{9,10}$/, 'Số điện thoại không hợp lệ')
    .max(10, 'độ dài tối đa 10 kí tự'),
  experienceYears: yup
    .number()
    .typeError('Kinh nghiệm phải là số')
    .min(0, 'Kinh nghiệm không được âm')
    .max(60, 'Kinh nghiệm tối đa 60 năm')
    .required('Kinh nghiệm không được để trống'),
  description: yup.string().max(500, 'độ dài tối đa 500 kí tự').required('Mô tả không được để trống'),
  departmentId: yup
    .number() // Đổi từ departmentName sang departmentId
    .typeError('Mã khoa phải là số')
    .required('Mã khoa không được để trống')
    .min(1, 'Mã khoa không hợp lệ')
})

export const SchemaSeach = yup.object({
  search: yup.string().trim().required('Phải nhập tên bác sĩ')
})

// export const ProfileDoctor = yup.object({
//   fullName: yup.string().required('Họ và tên là bắt buộc').min(2, 'Họ và tên tối thiểu 2 ký tự'),
//   email: yup.string().required('Email là bắt buộc').email('Email không hợp lệ'),
//   phone: yup
//     .string()
//     .required('Số điện thoại là bắt buộc')
//     .matches(/^(0|\+84)\d{9,10}$/, 'Số điện thoại không hợp lệ'),
//   experienceYears: yup
//     .number()
//     .required('Số năm kinh nghiệm là bắt buộc')
//     .min(0, 'Số năm kinh nghiệm không thể âm')
//     .max(60, 'Số năm kinh nghiệm không hợp lệ'),
//   description: yup.string().max(500, 'Mô tả không quá 500 ký tự'),
//   departmentId: yup.number().required('Khoa là bắt buộc').min(1, 'Vui lòng chọn khoa'),
//   address: yup.string(),
//   dateOfBirth: yup.string(),
//   imageUrl: yup.string().max(1000, 'KHông quá 1000 kí tự')
// })
export type DoctorProfile = yup.InferType<typeof ProfileDoctor>

export type SchemaDepartment = yup.InferType<typeof SchemaSeach>

export type SchemaProfileDoctor = yup.InferType<typeof ProfileDoctor>

export type SchemaSearch = yup.InferType<typeof AddSchema>

// export type SchemaSearch = yup.
export type Schema = yup.InferType<typeof schema> // dùng kiểu dữ liệu này hay fromRegister

export interface loginSchema {
  userName: string
  password: string
}
