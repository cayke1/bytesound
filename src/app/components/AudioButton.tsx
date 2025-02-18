import { useEffect, useRef, useState } from "react";
import { SoundButton } from "./ui/SoundButton";
import { useActiveContext } from "@/context/IsSoundsActive";

interface AudioButtonProps {
  soundSrc: string;
  icon: React.JSX.Element;
  title: string;
}

export function AudioButton({ soundSrc, icon, title }: AudioButtonProps) {
  const [active, setActive] = useState(false);
  const { soundsActive } = useActiveContext();
  const [vol, setVol] = useState(0.05);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(soundSrc);
    audioRef.current.loop = true;
    audioRef.current.volume = vol;

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [soundSrc]);

  const handleClick = () => {
    if (!soundsActive) return;
    setActive((prev) => !prev);
  };

  const handleOnVolumeChange = (volume: number) => {
    if(volume === 0) {
        setActive(false);
        setVol(0.05);
        return;
    }

    setVol(volume);
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      if (active && soundsActive) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [active, soundsActive]);

  return (
    <SoundButton
      title={title}
      volume={vol}
      onVolumeChange={handleOnVolumeChange}
      active={active && soundsActive}
      icon={icon}
      onClick={handleClick}
      className={`${soundsActive ? "cursor-pointer" : "cursor-not-allowed"}`}
    />
  );
}
