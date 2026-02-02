"use server";

import { Movie } from "../types/movie";

const TMDB_API_KEY =
  process.env.NEXT_PUBLIC_TMDB_API_KEY || process.env.TMDB_API_KEY;
const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

const GENRE_MAP: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

async function fetchTMDB(
  endpoint: string,
  params: Record<string, string> = {},
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (TMDB_ACCESS_TOKEN) {
    headers["Authorization"] = `Bearer ${TMDB_ACCESS_TOKEN}`;
  }

  const queryParams = new URLSearchParams({
    language: "en-US",
    ...params,
  });

  // Fallback to API Key query param if no Bearer token
  if (!TMDB_ACCESS_TOKEN && TMDB_API_KEY) {
    queryParams.append("api_key", TMDB_API_KEY);
  }

  if (!TMDB_ACCESS_TOKEN && !TMDB_API_KEY) {
    throw new Error("Missing TMDB Configuration (API Key or Access Token)");
  }

  const res = await fetch(`${BASE_URL}${endpoint}?${queryParams}`, {
    headers,
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`TMDB Error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function fetchRandomPair(
  excludeIds: number[] = [],
): Promise<Movie[]> {
  const candidates: Movie[] = [];
  const MAX_ATTEMPTS = 5;
  let attempts = 0;

  while (candidates.length < 2 && attempts < MAX_ATTEMPTS) {
    attempts++;
    // Randomize page for discovery (Top Rated / Popular)
    // Page 1-50 gives a good mix of known hits.
    const page = Math.floor(Math.random() * 20) + 1;

    try {
      const data = await fetchTMDB("/discover/movie", {
        sort_by: "popularity.desc",
        "vote_count.gte": "1000", // Ensure they are somewhat known
        page: page.toString(),
      });

      const results = (data.results as any[]).sort(() => 0.5 - Math.random());

      for (const m of results) {
        if (candidates.length >= 2) break;
        if (excludeIds.includes(m.id)) continue;
        if (candidates.some((c) => c.id === m.id)) continue;

        // Enrich genres
        const genres = m.genre_ids.map((id: number) => ({
          id,
          name: GENRE_MAP[id] || "Unknown",
        }));

        candidates.push({
          id: m.id,
          title: m.title,
          poster_path: m.poster_path, // Needs base URL prefix in UI
          backdrop_path: m.backdrop_path,
          overview: m.overview,
          vote_average: m.vote_average,
          vote_count: m.vote_count,
          release_date: m.release_date,
          popularity: m.popularity,
          genre_ids: m.genre_ids,
          genres,
        });
      }
    } catch (error) {
      console.error("Error fetching pair:", error);
    }
  }

  return candidates;
}
