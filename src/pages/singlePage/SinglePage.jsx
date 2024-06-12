import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./singlePage.scss";
import axios from "axios";
import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";

const Single = () => {
  const { id } = useParams();
  let [data, setData] = useState(null);
  let [error, setError] = useState(null);
  let [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => setData(res?.data))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [id]);

  console.log(data);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return (
      <div style={{ marginTop: "150px" }} className="single__loading container">
        <div className="single__loading__img bg__animation"></div>
        <div className="single__loading__info">
          <div className="single__loading__item bg__animation"></div>
          <div className="single__loading__item bg__animation"></div>
          <div className="single__loading__item bg__animation"></div>
          <div className="single__loading__item bg__animation"></div>
          <div className="single__loading__item bg__animation"></div>
          <div className="single__loading__item bg__animation"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <p>Xatolik yuz berdi: {error.message}</p>;
  }

  if (!data) {
    return <p>Mahsulot topilmadi</p>;
  }

  return (
    <div>
      <Header />
      <section className="single__item container">
        <div className="single__card">
          <div className="single__card__left">
            <img src={data?.thumbnail} alt={data?.title} />
          </div>
          <div className="single__card__right">
            <h1 style={{ fontSize: "30px" }}>{data?.title}</h1>
            <h3>{data?.description}</h3>
            <p>Category : {data?.category}</p>
            <p>Brand : {data?.brand}</p>
            <p>Price : {data?.price}$</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Single;
