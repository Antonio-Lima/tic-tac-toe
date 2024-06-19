import { ResultType } from "@/@types";

interface ModalProps {
  winner: ResultType;
  close: () => void;
}

export default function ResultModal({ winner, close }: ModalProps) {
  return (
    <div className="absolute top-0 bottom-0 w-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-8 bg-slate-100 rounded-lg flex items-center flex-col">
        <h1
          className={`text-3xl font-bold ${
            winner === "player"
              ? "text-green-500"
              : winner === "bot"
              ? "text-red-500"
              : "text-blue-600"
          }`}
        >
          {winner === "player" && "Parabéns! Você venceu"}
          {winner === "bot" && "Que pena! Você perdeu"}
          {winner === "draw" && "Ops! Tivemos um empate"}
        </h1>
        <p className="text-center mt-5 text-lg font-medium">
          {winner === "player" && "Tente agora com outra dificuldade."}
          {winner === "bot" && "Tente novamente."}
          {winner === "draw" && "Tente novamente."}
        </p>
        <button
          className="mt-5 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={close}
        >
          Jogar novamente
        </button>
      </div>
    </div>
  );
}
