import React from "react";
import Hero from "../../components/Hero";
import HomeInfos from "./HomeInfos";
import { productData } from "../../constants/carousel";
import ProductCarousel from "../../components/ProductCarousel";
import CarouselItem from "../../components/CarouselItem";
import ProductCategory from "../../components/ProductCategory";

const PageHeading = ({ heading, btnText }) => {
  return (
    <div className="flex items-center justify-between w-full pb-2 mt-4 border-b border-cl-black">
      <h2 className="text-2xl font-thin">{heading}</h2>
      <button className="py-2 btnPrimary">{btnText}</button>
    </div>
  );
};

const Home = () => {
  const productss = productData.map((item) => (
    <div key={item.id}>
      <CarouselItem
        name={item.name}
        url={item.imageurl}
        price={item.price}
        description={item.description}
      />
    </div>
  ));

  return (
    <div className="w-full min-h-screen ">
      <Hero />
      <section>
        <div className="container">
          <HomeInfos />
          <PageHeading heading={"Latest Products"} btnText={"Shop Now >>"} />
          <ProductCarousel products={productss} />
        </div>
      </section>
      
      <section className="bg-cl-sec">
        <div className="container">
          <div className="w-full pb-1 mb-4 text-2xl font-thin border-b border-b-cl-black">
            Categories
          </div>
          <ProductCategory />
        </div>
      </section>
      
      <section>
        <div className="container">
          <PageHeading heading={"Mobile Phones"} btnText={"Shop Now >>"} />
          <ProductCarousel products={productss} />
        </div>
      </section>
      
    </div>
  );
};

export default Home;
