import React from "react";
import Image from "next/image";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

const AnimeList = async () => {
  const response = await fetch("https://api.jikan.moe/v4/anime");
  const data = await response.json();

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">animeList</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.data.map((anime: any) => (
          <Card key={anime.mal_id} className="flex flex-col items-center">
            <CardHeader>
              <CardTitle>{anime.title}</CardTitle>
            </CardHeader>
            <Image
              src={anime.images.jpg.image_url}
              alt={anime.title}
              width={200}
              height={200}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AnimeList;
