import { useTheme } from "../../context/ThemeContext";
import { MdSunny } from "react-icons/md";
import { IoMoon } from "react-icons/io5";
import styles from "./ThemeToggle.module.css";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} className={styles.toggle}>
      {theme === "light" ? <IoMoon /> : <MdSunny />}
    </button>
  );
}

export default ThemeToggle;
