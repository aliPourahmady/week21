import * as yup from "yup";

const usernameSchema = yup.string().required("نام کاربری الزامیست");
const passwordSchema = yup
  .string()
  .min(8, "رمز عبور حداقل 8 کاراکتر باید باشد");

const loginSchema = yup.object({
  username: usernameSchema,
  password: passwordSchema,
});

const registerSchema = yup.object({
  username: usernameSchema,
  password: passwordSchema,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "رمز عبور باید یکسان باشد"),
});

export { loginSchema, registerSchema };
