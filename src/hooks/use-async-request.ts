import { useState, useCallback, useMemo } from "react";

export default function (fetch: () => Promise<void>) {
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const requestHandler = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setErrorMessage(null);
      await fetch();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [fetch]);

  return useMemo(
    () => ({
      isLoading,
      errorMessage,
      requestHandler,
    }),
    [isLoading, errorMessage, requestHandler]
  );
}
