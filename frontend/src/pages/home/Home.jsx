import React from "react";

import Hero from "../../components/Hero";
import Homeinfo from "../../components/Homeinfo";

const Home = () => {
  return (
    <div className="w-full min-h-screen ">
      <Hero />
      <section>
        <Homeinfo/>
      </section>
    </div>
  );
};

export default Home;
