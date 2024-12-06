import Navbar from "@/components/Navbar";
import Start from "@/components/pages/Start";

export default function Home() {
  return (
    <div className="w-full min-h-[100dvh] min-w-[360px] px-4 sm:px-8 md:px-[4vw] lg:px-[6vw] space-y-8">
      {/* The Navbar component is included at the top for navigation. */}
      <Navbar />
      {/* The Start component is rendered below the Navbar and handles
          the game setup, such as player names and game settings. */}
      <Start />
    </div>
  );
}
