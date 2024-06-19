import DifficultySelector from "@/components/DifficultySelector";
import Game from "@/components/Game";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-10">
      <h1 className="text-5xl font-bold text-blue-600">Jogo da Velha</h1>
      <Suspense>
        <DifficultySelector />
      </Suspense>
      <Suspense>
        <Game />
      </Suspense>
    </main>
  );
}
