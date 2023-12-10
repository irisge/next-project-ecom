import * as Yup from "yup"

export const loginSchema = Yup.object({
    email: Yup.string().email().required("Please enter your email").max(50).min(5),
    password: Yup.string().required('Your password should be at least 12 characters long, includes at least 1 special character, 1 uppercase and 1 number').min(12).max(50),
})