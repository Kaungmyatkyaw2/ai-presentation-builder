"use client";
import { useTheme } from "next-themes";
import About from "./_components/about";
import Footer from "./_components/footer";
import Hero from "./_components/hero";
import Navbar from "./_components/navbar";
import Subscription from "./_components/subscription";

const Index = () => {
  const { setTheme, theme } = useTheme();

  const toggleDarkMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="min-h-screen flex flex-col items-center w-full">
      <Navbar isDarkMode={theme == "dark"} toggleDarkMode={toggleDarkMode} />
      <main className="flex-grow">
        <Hero />
        <About />
        <Subscription />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
