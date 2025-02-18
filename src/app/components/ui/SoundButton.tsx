import { useState, useEffect } from "react";
import { JSX } from "react";
import { clsx } from "clsx";

interface SoundButtonProps {
  active: boolean;
  icon: JSX.Element;
  onClick: () => void;
  volume: number;
  onVolumeChange: (value: number) => void;
  className?: string;
  title: string;
}

export function SoundButton({
  active,
  icon,
  onClick,
  volume,
  onVolumeChange,
  className,
  title,
}: SoundButtonProps) {
  const [showVolume, setShowVolume] = useState(false);

  useEffect(() => {
    if (active) {
      setShowVolume(true);
      const timeout = setTimeout(() => setShowVolume(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [volume]);

  return (
    <div className="relative flex flex-col items-center group" title={title}>
      <button
        className={clsx(
          "w-[200px] h-[200px] drop-shadow-md rounded-md bg-slate-700 text-white text-2xl font-bold flex items-center justify-center hover:scale-105 transition-all",
          active ? "opacity-100" : "opacity-65",
          className
        )}
        onClick={onClick}
      >
        {icon}
      </button>

      {active && showVolume && (
        <span className="absolute top-2 text-white text-2xl font-bold">
          {Math.round(volume * 100)} %
        </span>
      )}

      {active && (
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
          className="absolute bottom-[0px] w-[80%] opacity-0 group-hover:opacity-100
          bg-slate-800 accent-slate-400 rounded-md appearance-none cursor-pointer
           transition-all"
        />
      )}
    </div>
  );
}
