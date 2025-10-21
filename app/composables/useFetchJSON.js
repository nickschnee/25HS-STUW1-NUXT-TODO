export function useFetchJson(url) {
  const {
    data,
    pending: loading,
    error,
    refresh,
  } = useFetch(url, {
    server: false,
  });

  return { data, loading, error, refresh };
}
