"use client";
import { useActiveContext } from "@/context/IsSoundsActive";
import { RainButton } from "./components/RainButton";
import { PlayCircle, StopCircle } from "lucide-react";
import { motion } from "framer-motion";
import { FireButton } from "./components/FireButton";
import { BirdButton } from "./components/BirdButton";

export default function Home() {
  const { soundsActive, toggleActive } = useActiveContext();

  const handleClick = () => {
    toggleActive();
  };

  return (
    <div className="relative w-[800px] h-[400px] bg-slate-900 grid grid-cols-3 items-center justify-center mx-auto my-auto">
      <motion.button
        className="
         absolute bottom-[-16px] right-0 left-0 px-4 py-2 
         rounded-lg drop-shadow-lg flex items-center 
         gap-4 justify-center bg-indigo-950 backdrop-blur-lg transition"
        onClick={handleClick}
      >
        {soundsActive ? (
          <>
            <StopCircle size={32} className="text-violet-700" />
            <p className="text-lg font-semibold">Parar sons</p>
          </>
        ) : (
          <>
            <PlayCircle size={32} className="text-violet-700" />
            <p className="text-lg font-semibold">Reproduzir sons</p>
          </>
        )}
      </motion.button>
      <RainButton />
      <FireButton />
      <BirdButton />
    </div>
  );
}
