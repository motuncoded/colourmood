import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
export default function Home() {
  return (
    <div className="max-w-[1480px] w-[calc(100% - 2rem)] m-auto">
      <Navbar />
      <Hero />
    </div>
  );
}
