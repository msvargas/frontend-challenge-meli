import React from "react";
import styles from "./Breadcrumbs.module.scss";

type Props = {
  className?: string;
  crumbs: string[];
};

export default function BreadcrumbsComponent({
  className = "",
  crumbs,
}: Props) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ul className={styles.container}>
        {crumbs.map((crumb, index) => (
          <React.Fragment key={crumb}>
            {index > 0 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.chevron}
                width="6"
                height="8"
              >
                <path fill="none" stroke="#666" d="M1 0l4 4-4 4"></path>
              </svg>
            )}
            <li>
              <span>{crumb}</span>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </nav>
  );
}
