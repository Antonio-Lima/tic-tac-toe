"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Button from "../Button";
import { useEffect } from "react";

const options = [
  { value: "easy", label: "Fácil" },
  { value: "medium", label: "Médio" },
  { value: "hard", label: "Difícil" },
];

export default function DifficultySelector() {
  const { replace } = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const selected = params.get("difficulty");

  function handleButtonClick(difficulty: string) {
    const query = new URLSearchParams(params);
    query.set("difficulty", difficulty);

    replace(`${pathname}?${query.toString()}`);
  }

  useEffect(() => {
    if (!selected) handleButtonClick("hard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <div className="flex gap-5 items-center justify-center">
      <h2 className="font-medium text-lg text-gray-600">
        Selecione a dificuldade:
      </h2>
      {options.map((item, index) => {
        return (
          <Button
            key={index}
            label={item.label}
            selected={selected === item.value}
            onClick={() => handleButtonClick(item.value)}
          />
        );
      })}
    </div>
  );
}
