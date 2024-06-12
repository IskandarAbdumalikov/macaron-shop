import React, { useCallback, useEffect, useState } from "react";
import "./products.scss";
import axios from "axios";
import { NavLink, useSearchParams } from "react-router-dom";
import Model from "../module/Model";
import { Swiper, SwiperSlide } from "swiper/react";
import x from "../../assets/x.svg";

import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

import "./styles.css";

import { EffectCube, Pagination } from "swiper/modules";
import Loading from "../loading/Loading";

const Products = () => {
  let API = "https://dummyjson.com";

  //
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryValue, seCategoryValue] = useState(null);
  let [offset, setOffset] = useState(1);

  //

  const [searchParams, setSearchParams] = useSearchParams();
  const [singleData, setSingleData] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  let id = searchParams.get("detail");
  const closeDetailModel = useCallback(() => {
    setSingleData(null);
    setSearchParams({});
  });

  useEffect(() => {
    if (id) {
      setDetailLoading(true);
      axios
        .get(`${API}/products/${id}`)
        .then((res) => setSingleData(res.data))
        .catch()
        .finally(() => setDetailLoading(false));
    }
  }, [searchParams]);

  useEffect(() => {
    axios
      .get(
        `${API}/products${categoryValue ? `/category/${categoryValue}` : ``}`,
        {
          params: {
            limit: 8 * offset,
          },
        }
      )
      .then((res) => setData(res.data.products));
  }, [categoryValue, offset]);
  useEffect(() => {
    axios
      .get(`${API}/products/categories`)
      .then((res) => setCategories(res.data));
  }, []);

  return (
    <div className="products__wrapper container">
      <div className="products__wrapper__header">
        <ul>
          <li onClick={() => seCategoryValue(null)}>All</li>
          {categories?.map((category) => (
            <li
              onClick={() => seCategoryValue(category.slug)}
              key={category.name}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="products">
        {data?.map((product) => (
          <div className="product__card" key={product.id}>
            <img
              onClick={() => setSearchParams({ detail: product.id })}
              src={product.thumbnail}
              alt=""
            />
            <div className="product__card__info">
              <NavLink to={`/product/${product.id}`}>
                <h2 >
                  {product.title}
                </h2>
              </NavLink>
              <p>{product.description}</p>
            </div>
            <div className="product__card__btns">
              <h2>{product.price} руб</h2>
              <button>
                <svg
                  width="15"
                  height="21"
                  viewBox="0 0 15 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.2911 5.37109H1V20.0002H14.2911V5.37109Z"
                    stroke="black"
                    stroke-width="1.4"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M4.12207 7.15493V3.40845C4.12207 2.07042 5.10329 1 6.26292 1H9.02818C10.1878 1 11.169 2.07042 11.169 3.40845V7.15493"
                    stroke="black"
                    stroke-width="1.4"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p>В корзину</p>
              </button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => setOffset((p) => p + 1)} className="see__more-btn">
        Показать ещё
      </button>
      {id ? (
        <Model>
          {detailLoading ? (
            <Loading />
          ) : (
            <div className="model__item">
              <Swiper
                effect={"cube"}
                grabCursor={true}
                cubeEffect={{
                  shadow: true,
                  slideShadows: true,
                  shadowOffset: 20,
                  shadowScale: 0.94,
                }}
                loop={true}
                pagination={true}
                modules={[EffectCube, Pagination]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <img
                    width={300}
                    style={{ height: "100%" }}
                    src={singleData?.images[0]}
                    alt=""
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    width={300}
                    style={{ height: "100%" }}
                    src={singleData?.images[1]}
                    alt=""
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    width={300}
                    style={{ height: "100%" }}
                    src={singleData?.images[2]}
                    alt=""
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    width={300}
                    style={{ height: "100%" }}
                    src={singleData?.images[3]}
                    alt=""
                  />
                </SwiperSlide>
              </Swiper>

              <div className="model__item__info">
                <h2>{singleData?.title}</h2>
                <p>{singleData?.description}</p>
              </div>
              <img
                onClick={closeDetailModel}
                src={x}
                width={30}
                className="closer"
                alt=""
              />
            </div>
          )}
        </Model>
      ) : (
        <></>
      )}

      {id ? <div onClick={closeDetailModel} className="overlay"></div> : <></>}
    </div>
  );
};

export default Products;
