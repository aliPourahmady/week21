import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CiSearch } from "react-icons/ci";
import useDebounce from "../../hooks/useDebounce";
import styles from "./SearchBox.module.css";

function SearchBox({ placeholder = "جستجوی کالا" }) {
  const router = useRouter();
  const [value, setValue] = useState(router.query.name || "");
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    if (!router.isReady) return;
    setValue(router.query.name || "");
  }, [router.isReady, router.query.name]);

  useEffect(() => {
    if (!router.isReady) return;

    const current = { ...router.query };
    const updated = { ...current, page: "1" };

    if (debouncedValue) {
      updated.name = debouncedValue;
    } else {
      delete updated.name;
    }

    if ((current.name || "") === debouncedValue) return;

    router.push({ pathname: router.pathname, query: updated }, undefined, {
      shallow: true,
    });
  }, [debouncedValue]);

  return (
    <div className={styles.searchBox}>
      <CiSearch className={styles.icon} />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default SearchBox;
