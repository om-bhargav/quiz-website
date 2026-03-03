"use client";
import React from "react";
import Wrapper from "../_components/Wrapper";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import CategoryCard from "../_components/CategoryCard";
import { colorMap } from "@/lib/constants";
import ErrorLoading from "@/components/ErrorLoading";
import { Category } from "../_components/CategoryCard";
import { CategoryCardSkeleton } from "@/components/CategoryCard";
export default function page() {
  const { data, isLoading, error, isValidating } = useSWR(
    "/api/categories/",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false
    }
  );
  const categories = data?.categories ?? [];
  const colors = Object.keys(colorMap);
  const loading = isLoading;
  return (
    <Wrapper title={"categories"}>
      <ErrorLoading
        loadingCard={CategoryCardSkeleton}
        loadingCount={6}
        loadingCols={3}
        loadingRows={2}
        loading={loading}
        dataLength={categories.length}
        emptyMessage="No Categories Found!"
        error={error}
      >
        <div className="grid grid-cols-3 gap-5 p-5">
          {/* {[{ name: "defaulttype" }, ...categories].map((cat: Category, index: number) =>
          cat.name === "defaulttype" ? (
            <CategoryCard
              key="all"
              category={{
                name: "all",
                image: cat?.image,
                id: "all",
                tournamentsSize: categories?.reduce(
                  (acc: number, item: any) => acc + (item?.tournamentsSize ?? 0),
                  0
                )
              }}
              color={colors[2]}
            />
          ) : (
            <CategoryCard
              key={cat?.id}
              category={cat}
              color={colors[index % colors.length]}
            />
          )
        )} */}
          {categories.map((cat: Category, index: number) => (
            <CategoryCard
              redirectBase="/mobile/categories"
              key={cat?.id}
              category={cat}
              color={colors[index % colors.length]}
            />
          ))}
        </div>
      </ErrorLoading>
    </Wrapper>
  );
}
