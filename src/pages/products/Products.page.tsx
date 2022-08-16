import { useSearchParams } from "react-router-dom";

import styles from "./Products.module.scss";
import { useFetch } from "@/hooks";
import Breadcrumbs from "@/components/breadcrumbs";
import type { IProducts } from "@/interfaces/products";

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const { data, isLoading, isError } = useFetch<IProducts>(
    `/api/items?q=${search}`
  );
  const crumbs = data?.categories || [];
  const products = (data?.items || [])?.slice(0, 4);

  return (
    <div className={styles.container}>
      <Breadcrumbs className={styles.breadcrumbs} crumbs={crumbs} />
      {isLoading && <h2 className={styles.loading}>Cargando...</h2>}
      {isError && <h2>Error al cargar los productos</h2>}
      <div className={styles.products}>
        {products.map((product) => (
          <div key={product.id} className={styles.productItem}>
            <img
              className={styles.picture}
              src={product.picture}
              alt={product.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
