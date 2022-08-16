import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import styles from "./NavHeader.module.scss";
import logoML from "@/assets/Logo_ML.png";
import logoML2x from "@/assets/Logo_ML@2x.png";
import icSearch from "@/assets/ic_Search.png";
import icSearch2x from "@/assets/ic_Search@2x.png";

export default function NavHeaderComponent() {
  const navigate = useNavigate();
  const inputSearchRef = React.useRef<HTMLInputElement>(null);
  const [searchParams] = useSearchParams();

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const search = inputSearchRef.current?.value;
    navigate({ pathname: "/items", search: `?search=${search}` });
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link className={styles.logo} to="/" title="Mercado Libre - Inicio">
          <img
            src={logoML}
            srcSet={`${logoML2x} 2x`}
            alt="Logo Mercado Libre"
          />
        </Link>
        <form className={styles.search} onSubmit={handleSubmit}>
          <input
            ref={inputSearchRef}
            placeholder="Nunca dejes de buscar"
            defaultValue={searchParams.get("search") || ""}
          />
          <button type="submit" className={styles.searchIcon}>
            <img src={icSearch} srcSet={`${icSearch2x} 2x`} alt="Buscar" />
          </button>
        </form>
      </div>
    </header>
  );
}
