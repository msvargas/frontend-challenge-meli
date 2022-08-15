import { Outlet } from "react-router-dom";
import NavHeader from "@/components/nav-header";
import styles from "./Home.module.scss";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <NavHeader />
      <Outlet />
    </div>
  );
}
