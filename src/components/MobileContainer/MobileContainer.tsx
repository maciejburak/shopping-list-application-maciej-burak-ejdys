import { type ReactNode } from "react";
import styles from "./MobileContainer.module.css";

interface MobileContainerProps {
  children: ReactNode;
}

export function MobileContainer({ children }: MobileContainerProps) {
  return (
    <div className={styles.container}>
      <div className={styles.notch} />

      <div className={styles.content}>
        <div className={styles.contentContainer}>
          {children}
        </div>
      </div>

      <div className={styles.bottomPart}>
        <div className={styles.bottomBar} />
      </div>
    </div>
  );
}
