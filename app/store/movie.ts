import { create } from "zustand";
import { GameState, Movie, JudgeResult } from "../types/movie";
import { fetchRandomPair } from "../actions/movie"; // New action
import { analyzeTaste } from "../lib/taste-engine";

interface GameStore extends GameState {
  startGame: () => Promise<void>;
  selectWinner: (winnerId: number) => Promise<void>;
  resetGame: () => void;
}

const INITIAL_STATE: Omit<
  GameStore,
  "startGame" | "selectWinner" | "resetGame"
> = {
  gameState: "START",
  round: 1,
  selectedMovies: [],
  roundCandidates: [null, null],
  roundHistory: [],
  verdict: null,
  isLoading: false,
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...INITIAL_STATE,

  startGame: async () => {
    set({ isLoading: true });
    try {
      const candidates = await fetchRandomPair([]);
      set({
        gameState: "PLAYING",
        round: 1,
        selectedMovies: [],
        roundHistory: [],
        roundCandidates: [candidates[0], candidates[1]],
        verdict: null,
        isLoading: false,
      });
    } catch (e) {
      console.error("Failed to start game", e);
      set({ isLoading: false });
    }
  },

  selectWinner: async (winnerId: number) => {
    const { round, roundCandidates, selectedMovies, roundHistory } = get();

    // Identify winner and loser
    const winner = roundCandidates.find((c) => c?.id === winnerId);
    const loser = roundCandidates.find((c) => c?.id !== winnerId);

    if (!winner || !loser) return;

    const newHistory = [
      ...roundHistory,
      { round, winnerId, loserId: loser.id },
    ];
    const newSelected = [...selectedMovies, winner];

    if (round >= 5) {
      set({ isLoading: true }); // Show loading while calculating
      const verdict = analyzeTaste(newSelected);
      set({
        gameState: "FINISHED",
        roundHistory: newHistory,
        selectedMovies: newSelected,
        verdict,
        isLoading: false,
      });
      return;
    }

    set({ isLoading: true });

    const previousWinner = winner;

    const excludeIds = [...newSelected.map((m) => m.id), loser.id];

    const newCandidatesRaw = await fetchRandomPair(excludeIds);

    const newChallenger =
      newCandidatesRaw.find((m) => m.id !== previousWinner.id) ||
      newCandidatesRaw[0];

    set({
      round: round + 1,
      selectedMovies: newSelected,
      roundHistory: newHistory,
      roundCandidates: [previousWinner, newChallenger],
      isLoading: false,
    });
  },

  resetGame: () => {
    set(INITIAL_STATE);
  },
}));
