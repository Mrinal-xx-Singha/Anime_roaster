export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  popularity: number;
  genre_ids: number[];
  genres?: { id: number; name: string }[];
}

export type TasteProfileType =
  | "FILM_BRO"
  | "BLOCKBUSTER_FAN"
  | "HORROR_FREAK"
  | "OSCAR_BAIT"
  | "COMEDY_GOLD"
  | "INDIE_DARLING"
  | "ROMCOM_ROYALTY"
  | "SCI_FI_VISIONARY"
  | "NOSTALGIA_MERCHANT"
  | "CHAOS_AGENT"
  | "BALANCED_VIEWER";

export interface JudgeResult {
  title: string;
  roast: string;
  emoji: string;
  profileType: TasteProfileType;
  scoreAnalysis: {
    avgScore: number;
    genreSpread: string[];
    mainstreamScore: number;
  };
}

export interface GameState {
  selectedMovies: Movie[];
  roundCandidates: [Movie | null, Movie | null];
  roundHistory: {
    round: number;
    winnerId: number;
    loserId: number;
  }[];
  round: number;
  gameState: "START" | "PLAYING" | "FINISHED";
  verdict: JudgeResult | null;
  isLoading: boolean;
}
