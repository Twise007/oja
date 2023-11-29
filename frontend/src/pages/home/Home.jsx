import React from "react";

import Hero from "../../components/Hero";
import HomeInfo from "./HomeInfo";
import HomeInfos from "./HomeInfos";

const Home = () => {
  return (
    <div className="w-full min-h-screen ">
      <Hero />
      <section>
        <HomeInfos />
      </section>
    </div>
  );
};

export default Home;
