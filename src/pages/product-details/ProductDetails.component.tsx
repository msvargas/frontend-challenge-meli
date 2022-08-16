import React from "react";
import Breadcrumbs from "@/components/breadcrumbs";
import styles from "./ProductDetails.module.scss";
import { useFetch } from "@/hooks";
import { useParams } from "react-router-dom";
import { IProductDetails } from "@/interfaces/productDetails.interface";

export default function ProductDetailsComponent() {
  const params = useParams<{ id: string }>();
  const {
    data: { item: productDetails } = {},
    isLoading,
    isError,
  } = useFetch<IProductDetails>(`/api/items/${params.id}`);
  const { data: productCategories } = useFetch<{ categories: string[] }>(
    productDetails
      ? `/api/categories/${productDetails?.category_id}`
      : undefined
  );
  const crumbs = productCategories?.categories || [];

  return (
    <div className={styles.container}>
      <Breadcrumbs className={styles.breadcrumbs} crumbs={crumbs} />
      {isLoading && <h2 className={styles.loading}>Cargando...</h2>}
      {isError && <h2>Error al cargar el producto</h2>}
      <div className={styles.details}>
        <div className={styles.wrapper}>
          <img className={styles.picture} src={productDetails?.picture} />
          <div className={styles.purchase}>
            <p className={styles.condition}>
              {productDetails?.condition} - {productDetails?.sold_quantity}{" "}
              Vendidos
            </p>
            <p className={styles.title}>{productDetails?.title}</p>
            <p className={styles.price}>
              {productDetails?.price.amount.toLocaleString("es-AR", {
                style: "currency",
                currency: productDetails?.price.currency,
                minimumFractionDigits: productDetails?.price.decimals,
              })}
            </p>
            <button className={styles.button}>Comprar</button>
          </div>
        </div>
        <div className={styles.description}>
          <p className={styles.descriptionLabel}>Descripción del producto</p>
          <p className={styles.descriptionBody}>
            {productDetails?.description}
          </p>
        </div>
      </div>
    </div>
  );
}
