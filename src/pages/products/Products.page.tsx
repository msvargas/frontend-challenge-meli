import { useSearchParams } from "react-router-dom";

import { useFetch } from "@/hooks";
import Breadcrumbs from "@/components/breadcrumbs";
import shippingImg from "@/assets/ic_shipping.png";
import shippingImg2x from "@/assets/ic_shipping@2x.png";

import type { IProducts } from "@/interfaces/products";
import styles from "./Products.module.scss";

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
            <div className={styles.productDetails}>
              <img
                className={styles.picture}
                src={product.picture}
                alt={product.title}
              />
              <div>
                <p className={styles.price}>
                  {product.price.amount.toLocaleString("es-AR", {
                    style: "currency",
                    currency: product.price.currency,
                    minimumFractionDigits: product.price.decimals,
                  })}
                  {product.free_shipping && (
                    <img
                      className={styles.freeShipping}
                      src={shippingImg}
                      srcSet={`${shippingImg2x} 2x`}
                    />
                  )}
                </p>
                <p className={styles.title}>{product.title}</p>
              </div>
            </div>
            <p className={styles.city}>{product.address.city_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
