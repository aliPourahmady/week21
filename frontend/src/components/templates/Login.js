import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useEffect, useReducer, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import { useLogin } from "@/services/mutation";
import { loginSchema } from "@/schemas/AuthSchema";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import logo from "../../assets/Union.svg";
import { isAuth, setToken } from "@/services/cookie";
import styles from "./Login.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "../molecules/ThemeToggle";

function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });
  useEffect(() => {
    if (isAuth()) {
      router.push("/dashboard");
    }
  }, []);

  const { mutate, isLoading, error } = useLogin();

  const onSubmit = (formData) => {
    mutate(formData, {
      onSuccess: (response) => {
        const token = response.token;
        setToken(token);
        toast.success("با موفقیت به حساب خود وارد شدید.");
        reset();
        router.push("/dashboard");
      },
      onError: () => {
        toast.error("نام کاربری یا رمز عبور اشتباه است");
      },
    });
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.theme}>{<ThemeToggle />}</div>
        <div className={styles.containerBox}>
          <div className={styles.header}>
            <Image src={logo} alt="logo" />
            <h2>فرم ورود</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <input
              type="text"
              placeholder="نام کاربری"
              {...register("username")}
            />
            {errors.username && <p>{errors.username.message}</p>}
            <div className={styles.password}>
              <input
                type={isVisible ? "text" : "password"}
                placeholder="رمز عبور"
                {...register("password")}
              />
              <div onClick={() => setIsVisible(!isVisible)}>
                {isVisible ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
              {errors.password && <p>{errors.password.message}</p>}
            </div>

            {error && <p>Invalid username or password.</p>}
            <button type="submit" disabled={isLoading}>
              {isLoading ? "درحال ورود..." : "ورود"}
            </button>
            <Link href="/register">ایحاد حساب کاربری!</Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
