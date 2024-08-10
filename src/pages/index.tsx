import { useState } from "react";

import Hero from "../components/Hero";
import Mood from "../components/Mood";
import ColorMoodSlider from "@/components/ColorMoodSlider";


export default function Home() {
  const [selectedMood, setSelectedMood] = useState<string>("");

  const handleMoodChange = (newMood: string) => {
    setSelectedMood(newMood);
  };

  return (
    <div className="max-w-[1280px] w-[calc(100% - 2rem)] m-auto max-xl:px-2  py-8 max-sm:max-w-[340px] max-md:max-w-[540px] max-xl:max-w-[700px]">
      <Hero />
      <ColorMoodSlider />
      <Mood selectedMood={selectedMood} />
    </div>
  );
}
