"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { colorMap } from "@/lib/constants";
interface CategoryCardProps {
  title: string;
  prize: string;
  image: string;
  color: string;
}

export default function CategoryCard({
  title,
  prize,
  image,
  color
}: CategoryCardProps) {
  return (
      <Card className="relative max-h-[300px]! gap-0 w-full m-0! my-3! shadow-[5px_5px_0px_0px_black] overflow-hidden rounded-3xl border-4 border-black p-0">

        {/* Top Image Section */}
        <div className="relative h-48 w-full border-b-4 border-black">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>

        {/* Bottom Content Section */}
        <div className={`${colorMap[color]} h-full py-6 px-4 text-center space-y-4`}>
          <h2 className="text-xl font-extrabold tracking-wide text-black">
            {title}
          </h2>

          <Button className="inline-block hover:bg-black bg-black text-white font-bold px-4 py-2 rounded-xl shadow-[4px_4px_0px_var(--color-gray-600)]">
            {prize}
          </Button>
        </div>
      </Card>
  );
}
