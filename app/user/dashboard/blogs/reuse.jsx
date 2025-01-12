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

export function CarouselDemo() {
  return (
    <Carousel className="w-full max-w-3xl">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex flex-col aspect-auto w-full p-6 min-h-[80svh] rounded-xl bg-slate-100">
                  <div className="min-h-[4svh] flex justify-center items-center">
                    <h1>Title</h1>
                  </div>
                  <div className="mt-2 bg-slate-200 rounded-xl h-[65svh] flex flex-col justify-center items-center w-full">
                    <div className="mt-2 w-[95%] min-h-[35svh] flex justify-center items-center bg-gray-300 rounded-t-3xl">
                      Image
                    </div>
                    <div className="w-[95%] min-h-[24svh] flex justify-center items-center bg-gray-400 rounded-b-3xl">
                      Description
                    </div>
                  </div>
                  <div className="mt-2 min-h-[8svh] flex justify-end items-center">
                    <Button
                      href="/user/dashboard/blogs"
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
