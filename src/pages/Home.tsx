import styles from "./Home.module.scss";
import NavHeaderComponent from "@/components/nav-header/NavHeader.component";

export default function Home() {
  return (
    <div className={styles.container}>
      <NavHeaderComponent />
      <h1>Home</h1>
    </div>
  );
}
