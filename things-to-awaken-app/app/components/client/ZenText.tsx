"use client";

import { useEffect, useState } from "react";
import style from "./ZenText.module.css";
import { clearInterval } from "timers";

const texts = [
  "thank you",
  "breathe",
  "definition of love",
  "you are love",
  "define your truth",
  "you are the ocean",
  "let your truth shine",
  "surrender to what it is",
  "you are nobody",
  "you are peace",
];

const arraySize = 250;

export default function ZenText() {
  const [text, setText] = useState(texts[0]);
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.round(Math.random() * 10);
      setText(texts[randomIndex]);
    }, 7500);

    () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-wrap gap-2 w-[150%] ml-[-5rem]">
      {Array(arraySize)
        .fill(true)
        .map((item, index) => (
          <TextItem key={index} text={text} />
        ))}
    </div>
  );
}

const TextItem = ({ text }: { text: string }) => {
  const getRandomDelay = () => `${Math.random() * 5}s`;

  return (
    <div
      className={style.animatedText}
      style={{ animationDelay: getRandomDelay() }}
    >
      {text}
    </div>
  );
};
