import { ReactNode, FunctionComponent } from "react";
import styles from "./style.module.css";

interface IAppErrorProps {
  children: ReactNode;
}

const AppError: FunctionComponent<IAppErrorProps> = ({ children }) => (
  <div className={styles.errorMessage}>{children}</div>
);

export default AppError;
