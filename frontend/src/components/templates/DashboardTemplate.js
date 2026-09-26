import { isAuth, removeToken } from "@/services/cookie";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import SearchBox from "../molecules/SearchBox";
import Image from "next/image";
import { TbLogout2 } from "react-icons/tb";
import ProductsTable from "../organisms/ProductsTable";
import avatar from "../../assets/Felix-Vogel-4.svg";

import styles from "./DashboardTemplates.module.css";
import ThemeToggle from "../molecules/ThemeToggle";

function DashboardTemplate() {
  const router = useRouter();
  useEffect(() => {
    if (!isAuth()) {
      router.push("/login");
    }
  }, []);
  const logoutHandler = () => {
    removeToken();
    toast.success("با موفقیت از حساب خود خارج شدید");
    router.replace("/login");
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <SearchBox />
          <div className={styles.user}>
            <span className={styles.line}></span>
            <Image src={avatar} alt="avatar" className={styles.avatar} />
            <div style={styles.accont}>
              <h2>میلاد عظمی</h2>
              <p>مدیر</p>
            </div>
            <span className={styles.line}></span>
            {<ThemeToggle />}
            <TbLogout2 className={styles.logout} onClick={logoutHandler} />
          </div>
        </header>
        <main>
          <ProductsTable />
        </main>
      </div>
    </div>
  );
}

export default DashboardTemplate;
