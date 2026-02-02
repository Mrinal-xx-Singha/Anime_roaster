# 🎬 Movie Taste Judge (The Roaster)

> "If you like _Fight Club_, you're a Film Bro. If you like _Sharknado_, you're a Legend."

**Movie Taste Judge** is an interactive web application that analyzes your film preferences through a "King of the Hill" style tournament. It pits movies against each other, learns from your choices, and assigns you a brutally honest "Taste Profile" (Roast) at the end.

![Movie Roaster Demo]
<img width="1207" height="623" alt="Screenshot (385)" src="https://github.com/user-attachments/assets/195d86a1-e9b3-4b2a-b2cb-219429263808" />

## ✨ Features

- **🏆 Versus Arena**: A 5-round tournament where you pick the winner between two movies.
- **🧠 AI Taste Engine**: Deterministic logic that analyzes your choices based on Genre, Popularity, Director hints, and Release Year to categorize you.
- **🎭 11+ Unique Profiles**:
  - `FILM_BRO` 🚬 (High score, Crime/Thriller)
  - `OSCAR_BAIT` 🏆 (Biopics, Drama)
  - `HORROR_FREAK` 🔪 (Thriller/Horror)
  - `A24_STAN` 🧢 (Indie, Low Popularity, High Score)
  - ...and many more.
- **🗳️ TMDB Integration**: Powered by The Movie Database (TMDB) for real-time movie data, generic posters, and synopses.
- **🎥 Cinematic UI**:
  - **Film Grain** overlays & retro aesthetic.
  - **3D Card Flips** using CSS perspectives and Framer Motion.
  - **Dynamic Typography** inspired by movie trailers.

## 🛠️ Tech Stack

Built with the cutting-edge React ecosystem:

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Animations**: [Motion](https://motion.dev/) (Framer Motion)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Source**: [TMDB API](https://www.themoviedb.org/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [TMDB API Key](https://www.themoviedb.org/documentation/api)

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/movie-roaster.git
    cd movie-roaster
    ```

2.  **Install dependencies**

    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Configure Environment**
    Create a `.env.local` file in the root directory and add your TMDB credentials:

    ```env
    # Option 1: Access Token (Recommended)
    TMDB_ACCESS_TOKEN=eyJhbGciOiJIUz...

    # Option 2: API Key (Legacy)
    NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
    ```

4.  **Run the development server**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser.

## 🎮 How to Play

1.  Click **"Start Judging"** on the home screen.
2.  You will be presented with two movies. **Click the card** of the one you prefer.
3.  You can **flip** the card (click the info icon) to read the synopsis if you're unsure.
4.  After 5 rounds, the **Verdict Reveal** will roast your taste based on:
    - **Average Score** of your picks.
    - **Genre Spread** (Are you obsessed with Horror?).
    - **Mainstream Score** (Do you only watch blockbusters?).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

_Note: This project uses the TMDB API but is not endorsed or certified by TMDB._
