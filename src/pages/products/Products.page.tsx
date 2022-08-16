import { useSearchParams, useNavigate } from "react-router-dom";

import { useFetch } from "@/hooks";
import Breadcrumbs from "@/components/breadcrumbs";
import shippingImg from "@/assets/ic_shipping.png";
import shippingImg2x from "@/assets/ic_shipping@2x.png";

import type { IProducts } from "@/interfaces/products.interface";
import styles from "./Products.module.scss";

const LIMIT_PRODUCTS = 4;

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const search = searchParams.get("search") || "";
  const { data, isLoading, isError } = useFetch<IProducts>(
    search ? `/api/items?q=${encodeURIComponent(search)}` : undefined
  );
  const crumbs = data?.categories || [];
  const products = (data?.items || [])?.slice(0, LIMIT_PRODUCTS);

  return (
    <div className={styles.container}>
      <Breadcrumbs className={styles.breadcrumbs} crumbs={crumbs} />
      {isLoading && search && <h2 className={styles.loading}>Cargando...</h2>}
      {isError && <h2>Error al cargar los productos</h2>}
      <div className={styles.products}>
        {products.map((product) => (
          <div
            key={product.id}
            className={styles.productItem}
            onClick={() => navigate({ pathname: `/items/${product.id}` })}
          >
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
            {!!product.address?.city_name && (
              <p className={styles.city}>{product.address?.city_name}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
