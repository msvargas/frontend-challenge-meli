import useSWR from "swr";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

const useFetch = <TResponse = any, TError = any>(url: string) => {
  const { data, error } = useSWR<TResponse, TError>(url, fetcher);
  return {
    data,
    isLoading: !error && !data,
    isError: !!error,
  };
};

export default useFetch;
