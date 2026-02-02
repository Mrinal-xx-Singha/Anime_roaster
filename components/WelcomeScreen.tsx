"use client";

import React from "react";
import { useGameStore } from "@/app/store/movie";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { PlayCircle, Loader2, Clapperboard } from "lucide-react";

export const WelcomeScreen = () => {
  const { startGame, isLoading } = useGameStore();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8 px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="space-y-4"
      >
        <div className="inline-block px-4 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-mono text-cyan-400 mb-4 items-center gap-2">
          <Clapperboard className="inline w-4 h-4 mr-2" />
          FILM CRITIC
        </div>
        <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-linear-to-b from-white to-slate-500 tracking-tighter">
          JUDGE YOUR
          <br />
          MOVIE TASTE
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Select your favorites in a 5-round tournament.
          <br />
          We'll analyze if you're a Film Bro, a Popcorn Addict, or Oscar Bait.
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Button
          size="lg"
          onClick={startGame}
          disabled={isLoading}
          className="h-16 px-10 text-xl rounded-full bg-white text-black hover:bg-slate-200 transition-transform hover:scale-105"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Casting Roles...
            </>
          ) : (
            <>
              <PlayCircle className="mr-2 h-6 w-6" /> Start Judging
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
};
