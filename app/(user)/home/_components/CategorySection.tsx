"use client";
import CategoryCard from "@/components/CategoryCard";
import CustomSwiper from "@/components/CustomSwiper";

const categories = [
  {
    title: "ROBOTICS",
    prize: "₹40,000",
    image: "/trophee.png",
    color: "amber"
  },
  {
    title: "AI CHALLENGE",
    prize: "₹60,000",
    image: "/trophee.png",
    color: "blue"
  },
  {
    title: "CYBER TECH",
    prize: "₹25,000",
    image: "/trophee.png",
    color: "pink"
  },
];

export default function CategorySection() {
  return (
    <div>
      <div className="flex uppercase text-2xl font-extrabold justify-between items-center">
        <div>categories</div>
        <div>⚡</div>
      </div>
      <div className=" w-full grid">
        <CustomSwiper>
          {categories.map((cat, index) => (
            <CategoryCard
              key={index}
              title={cat.title}
              prize={cat.prize}
              image={cat.image}
              color={cat.color}
            />
          ))}
        </CustomSwiper>
      </div>
    </div>
  );
}
