import { Movie, JudgeResult, TasteProfileType } from "../types/movie";

const calculateAverage = (arr: number[]) =>
  arr.reduce((a, b) => a + b, 0) / arr.length;

export const analyzeTaste = (movieList: Movie[]): JudgeResult => {
  if (!movieList.length) return generateFallback();

  // --- METRICS ---
  const scores = movieList.map((m) => m.vote_average || 0);
  const avgScore = calculateAverage(scores);

  const popularity = movieList.map((m) => m.popularity || 0);
  const avgPopularity = calculateAverage(popularity);

  const releaseYears = movieList.map((m) =>
    parseInt(m.release_date?.split("-")[0] || "2020"),
  );
  const avgYear = calculateAverage(releaseYears);

  // Genre Analysis
  const allGenres = movieList.flatMap(
    (m) => m.genres?.map((g) => g.name) || [],
  );
  const genreCounts: { [key: string]: number } = {};
  allGenres.forEach((g) => (genreCounts[g] = (genreCounts[g] || 0) + 1));

  // --- SCORING SYSTEM ---
  const points: Record<TasteProfileType, number> = {
    FILM_BRO: 0,
    BLOCKBUSTER_FAN: 0,
    HORROR_FREAK: 0,
    OSCAR_BAIT: 0,
    COMEDY_GOLD: 0,
    INDIE_DARLING: 0,
    ROMCOM_ROYALTY: 0,
    SCI_FI_VISIONARY: 0,
    NOSTALGIA_MERCHANT: 0,
    CHAOS_AGENT: 0,
    BALANCED_VIEWER: 1,
  };

  // 1. FILM BRO: High score + Crime/Drama/Thriller + Old-ish?
  // "Pulp Fiction", "Fight Club", "Dark Knight"
  if (avgScore > 7.5 && avgPopularity > 50) points.FILM_BRO += 3;
  if (genreCounts["Crime"]) points.FILM_BRO += genreCounts["Crime"] * 2;
  if (genreCounts["Drama"]) points.FILM_BRO += 1;

  // 2. BLOCKBUSTER FAN: High Popularity + Action/Adventure
  if (avgPopularity > 100) points.BLOCKBUSTER_FAN += 3;
  if (genreCounts["Action"])
    points.BLOCKBUSTER_FAN += genreCounts["Action"] * 2;
  if (genreCounts["Adventure"])
    points.BLOCKBUSTER_FAN += genreCounts["Adventure"] * 2;

  // 3. HORROR FREAK
  if (genreCounts["Horror"]) points.HORROR_FREAK += genreCounts["Horror"] * 5;
  if (genreCounts["Thriller"]) points.HORROR_FREAK += genreCounts["Thriller"];

  // 4. OSCAR BAIT: Drama + History + Biography (if mapped) + High Score
  if (genreCounts["Drama"]) points.OSCAR_BAIT += genreCounts["Drama"];
  if (genreCounts["History"]) points.OSCAR_BAIT += genreCounts["History"] * 3;
  if (genreCounts["War"]) points.OSCAR_BAIT += genreCounts["War"] * 3;
  if (avgScore > 8.0) points.OSCAR_BAIT += 2;

  // 5. COMEDY GOLD
  if (genreCounts["Comedy"]) points.COMEDY_GOLD += genreCounts["Comedy"] * 4;

  // 6. SCI_FI VISIONARY
  if (genreCounts["Science Fiction"])
    points.SCI_FI_VISIONARY += genreCounts["Science Fiction"] * 4;

  // 7. ROMCOM ROYALTY
  if (genreCounts["Romance"] && genreCounts["Comedy"]) {
    points.ROMCOM_ROYALTY += genreCounts["Romance"] + genreCounts["Comedy"];
  }
  if (genreCounts["Romance"])
    points.ROMCOM_ROYALTY += genreCounts["Romance"] * 3;

  // 8. NOSTALGIA MERCHANT: Old movies
  if (avgYear < 2000) points.NOSTALGIA_MERCHANT += (2000 - avgYear) / 2;

  // 9. INDIE DARLING: High Score + Low Popularity??
  if (avgScore > 7.0 && avgPopularity < 20) points.INDIE_DARLING += 10;

  // --- DETERMINE WINNER ---
  let winner: TasteProfileType = "BALANCED_VIEWER";
  let maxPoints = -1;

  (Object.keys(points) as TasteProfileType[]).sort().forEach((key) => {
    if (points[key] > maxPoints) {
      maxPoints = points[key];
      winner = key;
    }
  });

  // --- ROASTS ---
  const verdicts: Record<
    TasteProfileType,
    { title: string; emoji: string; roast: string }
  > = {
    FILM_BRO: {
      title: "The Film Bro",
      emoji: "🚬",
      roast:
        "You think watching 'Fight Club' is a personality trait. You've definitely explained the cinematography of 'The Dark Knight' to a woman who didn't ask.",
    },
    BLOCKBUSTER_FAN: {
      title: "Popcorn Addict",
      emoji: "🍿",
      roast:
        "If nothing explodes in the first 5 minutes, you verify the wifi connection. You keep Michael Bay in business.",
    },
    HORROR_FREAK: {
      title: "Scream Queen",
      emoji: "🔪",
      roast:
        "You sleep with the lights on, not out of fear, but because you're checking for killer clowns. Your comfort movies are everyone else's nightmares.",
    },
    OSCAR_BAIT: {
      title: "Academy Voter",
      emoji: "🏆",
      roast:
        "You only watch movies that are three hours long and incredibly depressing. You confuse 'boring' with 'artistic'.",
    },
    COMEDY_GOLD: {
      title: "Laugh Track",
      emoji: "😂",
      roast:
        "You use movies to numb the pain of existence. If Adam Sandler is in it, you're seated.",
    },
    SCI_FI_VISIONARY: {
      title: "Space Cadet",
      emoji: "👽",
      roast:
        "You're still waiting for your Hogwarts letter... wait, wrong nerd franchise. You're waiting for the alien invasion so you can finally be useful.",
    },
    ROMCOM_ROYALTY: {
      title: "Hopeless Romantic",
      emoji: "💕",
      roast:
        "You have unrealistic expectations of relationships because of Hugh Grant. Real life doesn't have a montage sequence.",
    },
    NOSTALGIA_MERCHANT: {
      title: "Back in My Day",
      emoji: "📼",
      roast:
        "You own a VCR 'ironically' but actually use it. You think CGI ruined cinema and won't shut up about practical effects.",
    },
    INDIE_DARLING: {
      title: "A24 Stan",
      emoji: "🧢",
      roast:
        "You wear a beanie in the summer. You understood the ending of that one abstract foreign film (you didn't, but you lied about it).",
    },
    CHAOS_AGENT: {
      title: "Agent of Chaos",
      emoji: "🎲",
      roast:
        "Your taste is all over the place. One minute it's 'The Godfather', next it's 'Sharknado'. Pick a lane!",
    },
    BALANCED_VIEWER: {
      title: "Casual Viewer",
      emoji: "📺",
      roast:
        "You like movies. Just... normal movies. You're the person who suggests 'Whatever is fine' on movie night. Boring.",
    },
  };

  const result = verdicts[winner];

  return {
    title: result.title,
    roast: result.roast,
    emoji: result.emoji,
    profileType: winner,
    scoreAnalysis: {
      avgScore,
      genreSpread: Object.entries(genreCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([k]) => k),
      mainstreamScore: Math.min(100, Math.max(0, avgPopularity / 2)), // Pop score inverted relative to TMDB raw? TMDB pop is high = good.
    },
  };
};

const generateFallback = (): JudgeResult => ({
  title: "Glitch",
  roast: "System failure.",
  emoji: "👾",
  profileType: "CHAOS_AGENT",
  scoreAnalysis: { avgScore: 0, genreSpread: [], mainstreamScore: 0 },
});
