import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Movie } from "@/app/types/movie"; // Update import
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info, RotateCw } from "lucide-react";
import { Button } from "./ui/button";

interface MovieCardProps {
  movie: Movie; // Renamed prop
  onClick?: () => void;
  isSelected?: boolean;
  minimal?: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onClick,
  isSelected = false,
  minimal = false,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Poster";

  return (
    <div className="relative w-full h-full perspective-1000 group">
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="w-full h-full relative preserve-3d"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Card
            className={`overflow-hidden cursor-pointer border-2 transition-all duration-300 h-full ${
              isSelected
                ? "border-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]"
                : "border-transparent hover:border-slate-700"
            }`}
            onClick={onClick}
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0 bg-slate-900">
              <Image
                src={posterUrl}
                alt={movie.title}
                fill
                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                unoptimized // TMDB external
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />
            </div>

            {/* Flip Button */}
            {!minimal && (
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-2 right-2 z-20 text-white/50 hover:text-white hover:bg-black/30 rounded-full"
                onClick={handleFlip}
              >
                <Info className="w-6 h-6" />
              </Button>
            )}

            {/* Content */}
            <CardContent className="relative z-10 w-full h-full flex flex-col justify-end p-4 transition-all duration-300">
              <div className="flex justify-between items-center mb-1">
                <Badge
                  variant="secondary"
                  className="bg-yellow-500/90 text-black font-bold border-none text-xs"
                >
                  ★ {movie.vote_average?.toFixed(1) || "N/A"}
                </Badge>
                <span className="text-[10px] font-mono text-slate-300 bg-black/50 px-2 py-1 rounded">
                  {movie.release_date?.split("-")[0] || "????"}
                </span>
              </div>

              <h3 className="text-white font-black text-lg leading-tight line-clamp-2 drop-shadow-xl mb-1">
                {movie.title}
              </h3>

              <div className="flex flex-wrap gap-1 text-[10px] text-slate-300 h-5 overflow-hidden">
                {movie.genres?.slice(0, 2).map((g) => (
                  <span
                    key={g.name}
                    className="border border-white/20 px-1.5 py-0.5 rounded-full"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <Card
            className="overflow-hidden cursor-default border-2 border-slate-700 h-full bg-slate-950"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full p-4 space-y-3">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <h3 className="text-sm font-bold text-white line-clamp-1">
                  {movie.title}
                </h3>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white/50 hover:text-white hover:bg-white/10 rounded-full shrink-0 h-6 w-6"
                  onClick={handleFlip}
                >
                  <RotateCw className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700">
                <p className="text-xs text-slate-300 leading-relaxed">
                  {movie.overview || "No synopsis available."}
                </p>
              </div>

              <Button
                className="w-full h-8 text-xs bg-white text-black hover:bg-slate-200"
                onClick={onClick}
              >
                Select Movie
              </Button>
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};
