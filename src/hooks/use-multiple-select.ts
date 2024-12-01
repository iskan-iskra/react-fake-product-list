import { useState, useCallback, useMemo } from "react";

export default function <T, K extends keyof T>(
  uniKey: K,
  multiSelectRestrictionCount: number
) {
  const [selectedList, setSelectedList] = useState<T[]>([]);

  const isRestrictionCountReached = useMemo(
    () => selectedList.length >= multiSelectRestrictionCount,
    [selectedList.length, multiSelectRestrictionCount]
  );

  const isInSelectedList = useCallback(
    (value: T): boolean =>
      selectedList.some((item) => item[uniKey] === value[uniKey]),
    [selectedList, uniKey]
  );

  const isAvailable = useCallback(
    (value: T): boolean =>
      !isInSelectedList(value) && !isRestrictionCountReached,
    [isInSelectedList, isRestrictionCountReached]
  );

  const addItem = useCallback(
    (value: T): void => {
      if (isAvailable(value)) {
        setSelectedList((prevList) => [...prevList, value]);
      }
    },
    [isAvailable]
  );

  const removeItem = useCallback(
    (value: T): void => {
      setSelectedList((prevList) =>
        prevList.filter((item) => item[uniKey] !== value[uniKey])
      );
    },
    [uniKey]
  );

  const clearSelected = useCallback(() => {
    setSelectedList([]);
  }, []);

  return useMemo(
    () => ({
      selectedList,
      addItem,
      removeItem,
      isAvailable,
      clearSelected,
      selectRestrictionCount: multiSelectRestrictionCount,
    }),
    [
      selectedList,
      addItem,
      removeItem,
      isAvailable,
      clearSelected,
      multiSelectRestrictionCount,
    ]
  );
}
