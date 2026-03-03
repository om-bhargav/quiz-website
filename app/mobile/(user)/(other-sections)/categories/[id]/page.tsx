"use client";
import React from "react";
import Wrapper from "../../_components/Wrapper";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import CategoryCard from "../../_components/CategoryCard";
import { colorMap } from "@/lib/constants";
import ErrorLoading from "@/components/ErrorLoading";
import { Category } from "../../_components/CategoryCard";
import { useParams } from "next/navigation";
import { CategoryCardSkeleton } from "@/components/CategoryCard";
export default function page() {
  const { id } = useParams();
  const { data, isLoading, error, isValidating } = useSWR(
    `/api/subcategories?categoryId=${id}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false
    }
  );
  const subCategories = data?.subCategories ?? [];
  const categoryName = data?.category;
  const colors = Object.keys(colorMap);
  return (
    <Wrapper title={`Sub categories Of ${categoryName ? categoryName:"..."}`}>
      <ErrorLoading
        loading={isLoading}
        loaderClassName="p-5"
        loadingCard={CategoryCardSkeleton}
        loadingCount={6}
        loadingCols={3}
        loadingRows={2}
        dataLength={subCategories.length}
        emptyMessage="No Sub Categories Found!"
        error={error}
      >
        <div className="grid grid-cols-3 gap-5 p-5">
          {subCategories.map(
            (cat: Category, index: number) =>
              (
                <CategoryCard
                  redirectBase={`/mobile/categories/${id}`}
                  key={cat?.id}
                  category={cat}
                  color={colors[index % colors.length]}
                />
              )
          )}
        </div>
      </ErrorLoading>
    </Wrapper>
  );
}
