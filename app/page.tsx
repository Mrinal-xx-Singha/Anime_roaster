"use client";

import React from "react";
import { useGameStore } from "./store/movie";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { VersusArena } from "@/components/VersusArena";
import { VerdictReveal } from "@/components/VerdictReveal";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const gameState = useGameStore((state) => state.gameState);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-foreground bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-slate-900 to-black overflow-hidden relative bg-grain">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full h-full">
        <AnimatePresence mode="wait">
          {gameState === "START" && (
            <motion.div key="start" exit={{ opacity: 0, y: -20 }}>
              <WelcomeScreen />
            </motion.div>
          )}
          {gameState === "PLAYING" && (
            <motion.div
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <VersusArena />
            </motion.div>
          )}
          {gameState === "FINISHED" && (
            <motion.div
              key="finished"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <VerdictReveal />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
