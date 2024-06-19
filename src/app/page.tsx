import DifficultySelector from "@/components/DifficultySelector";
import Game from "@/components/Game";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <h1 className="text-5xl font-bold text-blue-600">Jogo da Velha</h1>
      <DifficultySelector />
      <Game />
    </main>
  );
}
