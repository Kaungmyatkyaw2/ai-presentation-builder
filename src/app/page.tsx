"use client";
import About from "./_components/about";
import Footer from "./_components/footer";
import Hero from "./_components/hero";
import Navbar from "./_components/navbar";
import Subscription from "./_components/subscription";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center w-full">
      <Navbar />
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
