import { useEffect, useRef } from "react";
import useSWRInfinite from "swr/infinite";

interface InfiniteOptions<T> {
  endpoint: string;
  fetcher: (url: string) => Promise<T>;
  filter?: Record<string, string | number | undefined>;
}

export function useInfiniteScroll<T extends { nextCursor: string | null }>(
  options: InfiniteOptions<T>
) {
  const { endpoint, fetcher, filter } = options;

  const observerRef = useRef<HTMLDivElement | null>(null);

  const getKey = (pageIndex: number, previousPageData: T | null) => {
    if (previousPageData && !previousPageData.nextCursor) return null;

    const params = new URLSearchParams();

    if (pageIndex > 0 && previousPageData?.nextCursor) {
      params.append("cursor", previousPageData.nextCursor);
    }

    if (filter) {
      Object.entries(filter).forEach(([key, value]) => {
        if (value !== undefined && value !== "all") {
          params.append(key, String(value));
        }
      });
    }

    const query = params.toString();
    return query ? `${endpoint}?${query}` : endpoint;
  };

  const swr = useSWRInfinite<T>(getKey, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateFirstPage: true,
  });

  const { data, size, setSize, isValidating } = swr;

  const hasMore = data
    ? data[data.length - 1]?.nextCursor !== null
    : true;

  useEffect(() => {
    if (!observerRef.current || !hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isValidating && hasMore) {
        setSize((prev) => prev + 1);
      }
    });

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [isValidating, hasMore, setSize]);

  return {
    ...swr,
    observerRef,
    hasMore,
  };
}