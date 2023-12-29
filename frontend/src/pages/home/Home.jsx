import React, { useEffect } from "react";
import Hero from "../../components/Hero";
import Footer from "../../components/Footer";
import HomeInfos from "./HomeInfos";
import ProductCarousel from "../../components/ProductCarousel";
import CarouselItem from "../../components/CarouselItem";
import ProductCategory from "../../components/ProductCategory";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/features/product/productSlice";

const PageHeading = ({ heading, btnText }) => {
  return (
    <div className="flex items-center justify-between w-full pb-2 mt-4 border-b border-cl-black">
      <h2 className="text-2xl font-thin">{heading}</h2>
      <Link to="/shop">
        <button className="py-2 btnPrimary">{btnText}</button>
      </Link>
    </div>
  );
};

const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  const latest = products
    ?.filter((product) => {
      return product.quantity > 0;
    })
    ?.filter((product, index) => index < 7);

  const phones = products
    ?.filter((product) => {
      return product.quantity > 0;
    })
    ?.filter((product) => {
      return product.category === "Phone";
    })
    ?.filter((product, index) => index < 7);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const latestProducts = latest.map((item) => (
    <div key={item.id}>
      <CarouselItem
        name={item.name}
        url={item.image[0]}
        regularPrice={item.regularPrice}
        price={item.price}
        description={item.description}
        product={item}
      />
    </div>
  ));

  const latestPhone = phones.map((item) => (
    <div key={item.id}>
      <CarouselItem
        name={item.name}
        url={item.image[0]}
        regularPrice={item.regularPrice}
        price={item.price}
        description={item.description}
        product={item}
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
          <ProductCarousel products={latestProducts} />
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
          <ProductCarousel products={latestPhone} />
          {/* <ProductCarousel products={latestProducts} /> */}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
