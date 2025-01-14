import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@components/ui/button";

export function CarouselDemo({ data }) {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <Carousel className="w-full max-w-3xl">
      <CarouselContent>
        {data.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex flex-col aspect-auto w-full p-6 min-h-[80svh] rounded-xl bg-slate-100">
                  <div className="min-h-[4svh] flex justify-center items-center">
                    <h1>{item.title}</h1>
                  </div>
                  <div className="mt-2 bg-slate-200 rounded-xl h-[65svh] flex flex-col justify-center items-center w-full">
                    <div className="mt-2 w-[95%] min-h-[35svh] flex justify-center items-center bg-gray-300 rounded-t-3xl">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="object-cover w-full h-full rounded-t-3xl"
                      />
                    </div>
                    <div className="w-[95%] min-h-[24svh] flex justify-center items-center bg-gray-400 rounded-b-3xl p-4">
                      <p className="text-center">{item.description}</p>
                    </div>
                  </div>
                  <div className="mt-2 min-h-[8svh] flex justify-end items-center">
                    <Button
                      href={item.link}
                      className="px-6 py-3 bg-zinc-500 rounded-full -translate-x-6"
                    >
                      View Blog
                    </Button>
                  </div>
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
