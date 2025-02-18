import { Cloud } from "lucide-react";
import { SoundButton } from "./ui/SoundButton";
import { useEffect, useState } from "react";
import { useActiveContext } from "@/context/IsSoundsActive";

const rainSound = new Audio(
  "https://pqbnoyezospypjajwdzi.supabase.co/storage/v1/object/public/thinktalk/uploads/dd998900-837a-476a-b74f-738e81916821"
);
rainSound.loop = true;
rainSound.volume = 0.05;

export function RainButton() {
  const [active, setActive] = useState(false);
  const { soundsActive } = useActiveContext();
  const [vol, setVol] = useState(0.05);
  const handleClick = () => {
    if (!soundsActive) return;
    setActive(!active);
    console.log("RainButton clicked");
  };

  const handleOnVolumeChange = (volume: number) => {
    setVol(volume);
    rainSound.volume = volume;
  };

  useEffect(() => {
    if (active && soundsActive) {
      rainSound.play();
    } else {
      rainSound.pause();
      rainSound.currentTime = 0;
    }
  }, [active, soundsActive]);

  return (
    <SoundButton
      volume={vol}
      onVolumeChange={(volume) => handleOnVolumeChange(volume)}
      active={active && soundsActive}
      icon={<Cloud size={64} />}
      onClick={handleClick}
      className={`${soundsActive ? "cursor-pointer" : "cursor-not-allowed"}`}
    />
  );
}
