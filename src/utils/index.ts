export const fetchJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`
    );
  }
  return response.json() as T;
};

export function withDelay<T>(fn: Function, delay: number = 1000) {
  return async function (...args: unknown[]): Promise<T> {
    console.log(
      `Adding delay of ${delay}ms before executing ${fn.name} with params: ${args}`
    );
    await new Promise((resolve) => setTimeout(resolve, delay));
    return await fn(...args);
  };
}

export function measureExecutionTime(fn: Function) {
  return async function (...args: unknown[]) {
    const startTime = Date.now();
    console.log(`Starting execution of ${fn.name}...`);

    const result = await fn(...args);

    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log(`${fn.name} executed in ${duration}ms`);

    return result;
  };
}
