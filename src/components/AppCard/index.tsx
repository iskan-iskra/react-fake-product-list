import { ReactNode, FunctionComponent, memo } from "react";
import styles from "./style.module.css";

interface IAppCardProps {
  name: string;
  actions?: ReactNode;
}

const AppCard: FunctionComponent<IAppCardProps> = ({ name, actions }) => {
  return (
    <div className={styles.appCard}>
      <div>{name}</div>
      {actions && <div className={styles.appActionsWrapper}>{actions}</div>}
    </div>
  );
};

export default memo(AppCard);
