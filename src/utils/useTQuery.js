
import { useQuery } from "@tanstack/react-query";
import { useHttp } from "./useHttp";

export function useTQuery(key, url, method = "get", requestBody, enabled, callback, pathParams, appendQueryParams) {
  // console.log(`key, url,requestBody, enabled,`, key, url, requestBody, enabled,);

  const api = useHttp({});
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      if (!url) {
        return null; // Return early if URL is null or undefined
      }
      // console.log("requestBody", requestBody)
      return api[method](`${url}`, requestBody).then((res) => res.data);
    },

    onError: (e) => {
      console.log(e);
    },
    enabled: enabled

    // Other options can be added here if needed
  });
}
