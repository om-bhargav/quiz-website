import { useEffect, useRef, useMemo } from "react";
import useSWRInfinite, { SWRInfiniteConfiguration } from "swr/infinite";

interface UseInfiniteScrollOptions<T> {
  endpoint: string;
  fetcher: (url: string) => Promise<T>;
  filter?: Record<string, string | number | undefined>;
  swrOptions?: SWRInfiniteConfiguration;
}

export function useInfiniteScroll<
  T extends { nextCursor: string | null }
>({
  endpoint,
  fetcher,
  filter,
  swrOptions,
}: UseInfiniteScrollOptions<T>) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  // 🔹 stable filter key (prevents infinite rerenders)
  const filterKey = useMemo(
    () => JSON.stringify(filter ?? {}),
    [filter]
  );

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
    ...swrOptions,
  });

  const { data, setSize, isValidating } = swr;

  // 🔹 Reset pages when filter changes
  useEffect(() => {
    setSize(1);
  }, [filterKey]);

  const hasMore =
    data?.[data.length - 1]?.nextCursor !== null &&
    data?.[data.length - 1]?.nextCursor !== undefined;

  useEffect(() => {
    const node = observerRef.current;
    if (!node || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];

        if (first.isIntersecting && !isValidating && hasMore) {
          setSize((prev) => prev + 1);
        }
      },
      {
        rootMargin: "150px", // preload before bottom
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [hasMore, isValidating, setSize]);

  return {
    ...swr,
    observerRef,
    hasMore,
  };
}