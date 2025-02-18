import { FlameKindling } from "lucide-react";
import { SoundButton } from "./ui/SoundButton";
import { useEffect, useState } from "react";
import { useActiveContext } from "@/context/IsSoundsActive";

const fireSound = new Audio("/sound/fire.mp3");
fireSound.loop = true;
fireSound.volume = 0.05;

export function FireButton() {
  const [active, setActive] = useState(false);
  const { soundsActive } = useActiveContext();
  const [vol, setVol] = useState(0.05);
  const handleClick = () => {
    if (!soundsActive) return;
    setActive(!active);
  };

  const handleOnVolumeChange = (volume: number) => {
    setVol(volume);
    fireSound.volume = volume;
  };

  useEffect(() => {
    if (active && soundsActive) {
      fireSound.play();
    } else {
      fireSound.pause();
      fireSound.currentTime = 0;
    }
  }, [active, soundsActive]);

  return (
    <SoundButton
      volume={vol}
      onVolumeChange={(volume) => handleOnVolumeChange(volume)}
      active={active && soundsActive}
      icon={<FlameKindling size={64} />}
      onClick={handleClick}
      className={`${soundsActive ? "cursor-pointer" : "cursor-not-allowed"}`}
    />
  );
}
