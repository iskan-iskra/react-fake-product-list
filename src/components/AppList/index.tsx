import { ReactNode, FunctionComponent, memo } from "react";
import styles from "./style.module.css";

interface IAppListProps {
  mode?: "horizontal" | "vertical";
  title?: ReactNode;
  list?: ReactNode;
  listActions?: ReactNode;
}

const AppList: FunctionComponent<IAppListProps> = ({
  mode = "horizontal",
  title,
  list,
  listActions,
}) => (
  <div className={styles.appListWrapper}>
    {title && <div className={styles.appTitleWrapper}>{title}</div>}
    {list && <div className={`${styles.appList} ${styles[mode]}`}>{list}</div>}
    {listActions && (
      <div className={styles.appActionsWrapper}>{listActions}</div>
    )}
  </div>
);

export default memo(AppList);
