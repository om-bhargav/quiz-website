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
  const loading = isLoading || isValidating;
  return (
    <Wrapper title={`Sub categories Of ${categoryName ? categoryName:"..."}`}>
      <ErrorLoading
        loading={loading}
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
