"use client";

import React from "react";
import { useGameStore } from "@/app/store/movie";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Share2 } from "lucide-react";
import { MovieCard } from "./MovieCard";

export const VerdictReveal = () => {
  const { verdict, selectedMovies, resetGame } = useGameStore();

  if (!verdict) return null;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto py-12 px-4 space-y-12">
      {/* Verdict Header */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="text-center space-y-4"
      >
        <div className="text-6xl md:text-8xl">{verdict.emoji}</div>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
          {verdict.title}
        </h1>
        <div className="h-1 w-32 bg-white/20 mx-auto rounded-full" />
        <p className="text-xl md:text-2xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
          &quot;{verdict.roast}&quot;
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full"
      >
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-center">
          <div className="text-sm text-slate-400 uppercase tracking-widest mb-1">
            Avg Score
          </div>
          <div className="text-2xl font-mono font-bold text-white">
            {verdict.scoreAnalysis.avgScore.toFixed(1)}
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-center">
          <div className="text-sm text-slate-400 uppercase tracking-widest mb-1">
            Basic Score
          </div>
          <div className="text-2xl font-mono font-bold text-white">
            {verdict.scoreAnalysis.mainstreamScore.toFixed(0)}%
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-center">
          <div className="text-sm text-slate-400 uppercase tracking-widest mb-1">
            Top Genres
          </div>
          <div className="text-sm font-mono text-white truncate px-2">
            {verdict.scoreAnalysis.genreSpread.join(", ") || "N/A"}
          </div>
        </div>
      </motion.div>

      {/* History Strip */}
      <div className="w-full space-y-4">
        <h3 className="text-center text-slate-500 uppercase tracking-widest text-sm">
          Your Choices
        </h3>
        <div className="grid grid-cols-5 gap-2 md:gap-4">
          {selectedMovies.map((movie, i) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              // transition={{ delay: 0.5 + i * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="aspect-2/3 relative rounded-lg overflow-hidden"
            >
              <MovieCard movie={movie} minimal />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex gap-4"
      >
        <Button
          size="lg"
          variant="outline"
          className="border-white/20 hover:bg-white/10 hover:text-slate-100"
          onClick={() => {
            // Mock Share
            navigator.clipboard.writeText(
              `I got roast as: ${verdict.title} ${verdict.emoji}\n\n"${verdict.roast}"\n\nJudge your movie taste!`,
            );
            alert("Copied to clipboard!");
          }}
        >
          <Share2 className="mr-2 h-4 w-4" /> Share Shame
        </Button>
        <Button
          size="lg"
          onClick={resetGame}
          className="bg-white text-black hover:bg-slate-200"
        >
          <RefreshCcw className="mr-2 h-4 w-4" /> Judge Again
        </Button>
      </motion.div>
    </div>
  );
};
