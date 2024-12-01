import { useState, useCallback, useMemo } from "react";

export default function <T, K extends keyof T>(uniKey: K) {
  const [selected, setSelected] = useState<T | null>(null);

  const addItem = useCallback((value: T): void => setSelected(value), []);

  const removeItem = useCallback((): void => setSelected(null), []);

  const isAvailable = useCallback(
    (value: T): boolean => !selected || selected[uniKey] !== value[uniKey],
    [selected, uniKey]
  );

  return useMemo(
    () => ({
      selected,
      addItem,
      removeItem,
      isAvailable,
    }),
    [selected, addItem, removeItem, isAvailable]
  );
}
