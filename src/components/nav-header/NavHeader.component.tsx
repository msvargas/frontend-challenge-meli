import { Link } from "react-router-dom";

import styles from "./NavHeader.module.scss";
import logoML from "@/assets/Logo_ML.png";
import logoML2x from "@/assets/Logo_ML@2x.png";
import icSearch from "@/assets/ic_Search.png";
import icSearch2x from "@/assets/ic_Search@2x.png";

export default function NavHeaderComponent() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link
          className={styles.logo}
          to="/"
          aria-label="Mercado Libre - Inicio"
        >
          <img
            src={logoML}
            srcSet={`${logoML2x} 2x`}
            alt="Logo Mercado Libre"
          />
        </Link>
        <div className={styles.search}>
          <input placeholder="Nunca dejes de buscar" />
          <button type="submit" className={styles.searchIcon}>
            <img src={icSearch} srcSet={`${icSearch2x} 2x`} alt="Buscar" />
          </button>
        </div>
      </div>
    </header>
  );
}
