import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ReactPasswordChecklist from "react-password-checklist";
import toast from "react-hot-toast";
import { FaCheck, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useLogin, useRegister } from "@/services/mutation";
import { registerSchema } from "@/schemas/AuthSchema";
import logo from "../../assets/Union.svg";
import { setToken } from "@/services/cookie";

import styles from "./RegisterTemplate.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

function RegistreTemplate() {
  const router = useRouter();
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: { username: "", password: "", confirmPassword: "" },
  });

  const {
    mutate: registerMutate,
    isLoading: isRegistering,
    error: registerError,
  } = useRegister();
  const {
    mutate: loginMutate,
    isLoading: isLoggingIn,
    error: loginError,
  } = useLogin();

  const onSubmit = (formData) => {
    const { confirmPassword, ...registrationData } = formData;

    registerMutate(registrationData, {
      onSuccess: () => {
        loginMutate(
          {
            username: registrationData.username,
            password: registrationData.password,
          },
          {
            onSuccess: (loginResponse) => {
              const token = loginResponse.token;
              if (token) {
                setToken(token);
                router.replace("/dashboard");
                reset();
                setIsPasswordValid(false);
                toast.success("ثبت نام با موفقیت انجام شد ");
              } else {
                router.push("/login");
                toast.error("ثبت نام با خطا مواجه شد لطفا دوباره وارد شوید.");
              }
            },
            onError: (err) => {
              toast.error("ثبت نام با شکست مواجه شد لطفا دوباره ثبت کنید ");
            },
          },
        );
      },
      onError: (err) => {
        toast.error("ثبت نام با شکست مواجه شد لطفا دوباره ثبت کنید ");
      },
    });
  };

  const isLoading = isRegistering || isLoggingIn;

  return (
    <div className={styles.container}>
      <div className={styles.theme}>{/* <ThemeToggle /> */}</div>
      <div className={styles.containerBox}>
        <div className={styles.header}>
          <Image src={logo} alt="logo" />
          <h2>فرم ثبت نام</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div>
            <input
              type="text"
              placeholder="نام کاربری"
              {...register("username")}
            />
            {errors.username && <p>{errors.username.message}</p>}
          </div>
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
          <div>
            <input
              type="password"
              placeholder="تکرار رمز عبور"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
            {watch("password") && (
              <div className={styles.checkList}>
                <ReactPasswordChecklist
                  className={styles.validation}
                  validTextColor="#4ade80"
                  invalidTextColor="#f43f5e"
                  rules={["minLength", "number", "capital", "match"]}
                  minLength={8}
                  value={watch("password")}
                  valueAgain={watch("confirmPassword")}
                  onChange={setIsPasswordValid}
                  messages={{
                    minLength: "رمز عبور باید بیشتر از 8 کاراکتر باشد ",
                    number: "رمز عبور باید شامل عدد باشد ",
                    capital:
                      "رمز عبور باید شامل حداقل یک حرف بزرگ انگلیسی باشد ",
                    match: "رمز عبور و تکرار آن باید یکسان باشند",
                  }}
                  iconComponents={{
                    ValidIcon: <FaCheck color="#4ade80" />,
                    InvalidIcon: <IoClose color="#f43f5e" />,
                  }}
                />
              </div>
            )}
          </div>
          {(registerError || loginError) && (
            <p>
              {registerError?.response.data.message ||
                loginError?.response.data.message}
            </p>
          )}
          <button type="submit" disabled={isLoading || !isPasswordValid}>
            {isLoading ? "درحال ثبت نام..." : "ثبت نام"}
          </button>
          <Link href="/login">حساب کاربری دارید؟</Link>
        </form>
      </div>
    </div>
  );
}

export default RegistreTemplate;
