interface Options {
  url: string;
  method: "POST" | "GET" | "PUT" | "PATCH" | "DELETE";
  body?: string;
}
export const apiRequest = async <T>(options: Options): Promise<T> => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });
  const defaults = { headers };
  options = { ...defaults, ...options };
  const response = await fetch(`${options.url}`, options);
  if (!response.ok) {
    const error = (await response.json()) as Error;
    throw error;
  }
  if (response.status === 204) {
    return {} as T;
  }
  return (await response.json()) as T;
};
