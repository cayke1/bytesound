import { Bird } from "lucide-react";
import { SoundButton } from "./ui/SoundButton";
import { useEffect, useState } from "react";
import { useActiveContext } from "@/context/IsSoundsActive";

const birdSound = new Audio("/sound/bird.mp3");
birdSound.loop = true;
birdSound.volume = 0.05;

export function BirdButton() {
  const [active, setActive] = useState(false);
  const { soundsActive } = useActiveContext();
  const [vol, setVol] = useState(0.05);
  const handleClick = () => {
    if (!soundsActive) return;
    setActive(!active);
  };

  const handleOnVolumeChange = (volume: number) => {
    setVol(volume);
    birdSound.volume = volume;
  };

  useEffect(() => {
    if (active && soundsActive) {
      birdSound.play();
    } else {
      birdSound.pause();
      birdSound.currentTime = 0;
    }
  }, [active, soundsActive]);

  return (
    <SoundButton
      volume={vol}
      onVolumeChange={(volume) => handleOnVolumeChange(volume)}
      active={active && soundsActive}
      icon={<Bird size={64} />}
      onClick={handleClick}
      className={`${soundsActive ? "cursor-pointer" : "cursor-not-allowed"}`}
    />
  );
}
