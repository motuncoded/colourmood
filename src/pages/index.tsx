import {
  useState 
} from "react";


import Hero from "../components/Hero";
import Mood from "../components/Mood";

export default function Home() {

  const [selectedMood, setSelectedMood] = useState<string>("");

  const handleMoodChange = (newMood: string) => {
    setSelectedMood(newMood);
  };

  return (
    <div>
      <Hero />
      <Mood selectedMood={selectedMood} />
    </div>
  );
}


