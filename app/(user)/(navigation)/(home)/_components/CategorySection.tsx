"use client";
import CategoryCard from "@/components/CategoryCard";
import CustomSwiper from "@/components/CustomSwiper";
import ErrorLoading from "@/components/ErrorLoading";
import { colorMap } from "@/lib/constants";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
// const categories = [
//   { id: 0, name: "All Contests", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&q=80", prize: "ALL", color: "yellow" },
//   { id: 1, name: "Sports", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&q=80", prize: "₹25,000", color: "amber" },
//   { id: 2, name: "Robotics", image: "https://images.unsplash.com/photo-1531746795393-6c60dc565dea?w=400&q=80", prize: "₹40,000", color: "blue" },
//   { id: 3, name: "GK", image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80", prize: "₹15,000", color: "pink" },
//   { id: 4, name: "Movies", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80", prize: "₹20,000", color: "green" },
//   { id: 5, name: "Tech", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80", prize: "₹30,000", color: "yellow" },
//   { id: 6, name: "Music", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80", prize: "₹18,000", color: "pink" },
// ];

interface Props {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

export default function CategorySection({ selected, setSelected }: Props) {
  const { data, isLoading, error } = useSWR("/api/categories/", fetcher);
  const colors = Object.keys(colorMap);
  return (
    <div className="space-y-4">
      <div className="flex uppercase text-2xl font-extrabold justify-between items-center">
        <div>categories</div>
        <div>⚡</div>
      </div>
      <div className="w-full grid">
        <ErrorLoading loading={isLoading} error={error}>
          <CustomSwiper>
            {data?.categories && [{ name: "defaulttype" },...data?.categories].map(
              (cat: any, index: number) =>
                cat.name === "defaulttype" ? (
                  <CategoryCard
                    name="all"
                    image={"/default.png"}
                    onClick={() => setSelected("all")}
                    id={"all"}
                    selected={selected === "all"}
                    color={colors[2]}
                    eventsCount={data.categories.reduce((acc: number,item: any)=>acc+(item?._count?.tournaments ?? 0),0)}
                  />
                ) : (
                  <CategoryCard
                    key={cat.id}
                    id={cat.id}
                    selected={selected === cat.id}
                    onClick={() => setSelected(cat.id)}
                    name={cat.name}
                    image={cat.image}
                    eventsCount={cat._count.tournaments}
                    color={colors[index % colors.length]}
                  />
                )
            )}
          </CustomSwiper>
        </ErrorLoading>
      </div>
    </div>
  );
}
