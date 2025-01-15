import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@components/ui/button";
import { usePathname } from "@node_modules/next/navigation";
import Link from "@node_modules/next/link";

export function CarouselCard({ data }) {
  const pathname = usePathname();
  if (!data || data.length === 0) {
    return <p className="text-gray-500">No blogs available</p>;
  }

  return (
    <Carousel className="w-full max-w-3xl">
      <CarouselContent>
        {data.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-4">
              <Card className="bg-slate-100 rounded-xl shadow-lg">
                <CardContent className="flex flex-col items-center p-6">
                  <div className="mb-4 text-center">
                    <h1 className="text-xl font-bold">{item.title}</h1>
                  </div>
                  <div className="mb-4">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-60 object-cover rounded-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    className="mt-2 bg-slate-50"
                  >
                    <Link href={`${pathname}/${item._id}`}>Read More</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
