"use client";

import React from "react";
import { useGameStore } from "@/app/store/movie";
import { MovieCard } from "./MovieCard";
import { Loader2 } from "lucide-react";

export const VersusArena = () => {
  const { roundCandidates, selectWinner, isLoading, round } = useGameStore();

  const candidateA = roundCandidates[0];
  const candidateB = roundCandidates[1];

  if (isLoading || !candidateA || !candidateB) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-white space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="text-xl animate-pulse">Summoning Challengers...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto py-8">
      {/* HUD */}
      <div className="mb-8 text-center space-y-1">
        <h2 className="text-3xl font-black text-white tracking-widest uppercase italic">
          ROUND {round} <span className="text-slate-600">/ 5</span>
        </h2>
        <p className="text-slate-400">Choose the better anime</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 w-full px-4 h-full">
        {/* Candidate A */}
        <div className="w-full max-w-[380px] aspect-2/3 md:aspect-2/3 relative">
          <MovieCard
            movie={candidateA}
            onClick={() => selectWinner(candidateA.id)}
            isSelected={false}
          />
          <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-0.5 rounded-full text-[10px] font-bold border border-white/20">
            A
          </div>
        </div>

        <div className="relative text-5xl md:text-7xl font-black italic z-10 my-4 md:my-0">
          <span className="absolute inset-0 text-transparent bg-clip-text bg-linear-to-b from-red-500 to-orange-600 blur-md opacity-50">
            VS
          </span>
          <span className="relative text-transparent bg-clip-text bg-linear-to-b from-white via-red-200 to-red-500 drop-shadow-[0_2px_10px_rgba(255,0,0,0.8)]">
            VS
          </span>
        </div>

        {/* Candidate B */}
        <div className="w-full max-w-[380px] aspect-2/3 md:aspect-2/3 relative">
          <MovieCard
            movie={candidateB}
            onClick={() => selectWinner(candidateB.id)}
            isSelected={false}
          />
          <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-0.5 rounded-full text-[10px] font-bold border border-white/20">
            B
          </div>
        </div>
      </div>
    </div>
  );
};
