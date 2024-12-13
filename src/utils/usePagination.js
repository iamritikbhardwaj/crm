// usePagination.js

import { useInfiniteQuery } from '@tanstack/react-query';
import { useHttp } from './useHttp';

export function usePaginatedQuery({
  queryKey,
  url,
  method = 'get',
  requestBody,
  enabled,
  options,
  parmeter,
}) {
  const api = useHttp({
    headers: {
      Authorization: `Bearer YOUR_TOKEN`, // Adjust authorization as needed
    },
  });
  return useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      let convertedPayload = `${new URLSearchParams({
        ...parmeter,
        page: pageParam,
        rowsPerPage: 10
      }).toString()}`
      // console.log("pageOnScreen:", `${url}?page=${pageParam}`)
      const res = await api[method](`${url}?${convertedPayload}`, requestBody);
      return res.data; // Adjust based on your API response
    },
    getNextPageParam: (lastPage, allPages) => {
      // Only request next page if there are more pages
      return lastPage?.meta?.currentPage ? allPages.length + 1 : undefined;
    },
    enabled,
    ...options,
  });
}