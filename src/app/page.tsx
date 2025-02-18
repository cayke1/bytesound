"use client";
import { useActiveContext } from "@/context/IsSoundsActive";
import { RainButton } from "./components/RainButton";
import { PlayCircle, StopCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { soundsActive, toggleActive } = useActiveContext();
  
  const handleClick = () => {
    toggleActive();
  };

  return (
    <div className="relative w-[800px] h-[400px] bg-slate-900 flex items-center justify-center mx-auto my-auto">
      <motion.button
        className="absolute bottom-[-25px] border border-white p-4 rounded-lg drop-shadow-lg flex items-center gap-4 justify-center bg-white/10 backdrop-blur-lg hover:bg-white/20 transition"
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {soundsActive ? (
          <>
            <StopCircle size={32} className="text-amber-700" />
            <motion.p 
              className="text-xl font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Parar sons
            </motion.p>
          </>
        ) : (
          <>
            <PlayCircle size={32} className="text-amber-700" />
            <motion.p 
              className="text-xl font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Reproduzir sons
            </motion.p>
          </>
        )}
      </motion.button>
      <RainButton />
    </div>
  );
}
