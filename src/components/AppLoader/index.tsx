import { FunctionComponent } from "react";
import { createPortal } from "react-dom";
import styles from "./style.module.css";

const AppLoader: FunctionComponent = () =>
  createPortal(
    <div className={styles.appLoaderWrapper}>
      <div className={styles.appLoader}></div>
    </div>,
    document.body
  );

export default AppLoader;
