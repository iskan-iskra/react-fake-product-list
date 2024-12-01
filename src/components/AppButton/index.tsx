import {
  ButtonHTMLAttributes,
  ReactNode,
  FunctionComponent,
  memo,
} from "react";
import styles from "./style.module.css";

interface IAppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const AppButton: FunctionComponent<IAppButtonProps> = ({
  children,
  ...props
}) => (
  <button className={styles.appButton} {...props}>
    {children}
  </button>
);

export default memo(AppButton);
