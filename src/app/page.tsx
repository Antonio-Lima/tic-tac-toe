import DifficultySelector from "@/components/DifficultySelector";
import Game from "@/components/Game";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <DifficultySelector />
      <Game />
    </main>
  );
}
