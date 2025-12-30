import "./store/GoodsSlice";
import "./SliderCatalog.css";
import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Margin } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function SliderCatalog({ filter, goods }) {

  let chosenGoods = new Array();
  goods.map((item) => {
    if(typeof filter.filter ==="string"){
      if (filter.filter === item[filter.prop]) chosenGoods.push(item);
    }
    else{
      if (filter.filter !== !item[filter.prop]) chosenGoods.push(item);
    }
  });

//   console.log(chosenGoods);
let slidesCount=chosenGoods.length;

  let settings = {
    dots: false,
    infinite: true,
    speed: 250,
    slidesToShow: Math.min(slidesCount, 4),
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 9000,
    responsive: [
      {
        breakpoint: 1216,
        settings: {
            slidesToShow: Math.min(slidesCount, 3),
        },
      },
      {
        breakpoint: 900,
        settings: {
            slidesToShow: Math.min(slidesCount, 2),
        },
      },
      {
        breakpoint: 660,
        settings: {
            arrows: false,
            slidesToShow: Math.min(slidesCount, 1),
        },
      },
      {
        breakpoint: 611,
        settings: {
          arrows: false,
          slidesToShow: Math.min(slidesCount, 1),
        },
      },
    ],
  };

  return (
    <div className="goodsSliderContainer">
      <Slider {...settings} >
        {chosenGoods.map((item) => (
        <div className="itemContainerDad" key={item.id}>
          <div className="itemContainer">
            <div className="absol">
              {item.new && <div className="new">NEW!</div>}
              {item.discount !== 0 && (
                <div className="discount"> -{item.discount}%</div>
              )}
            </div>
            <div className="description">
              <Link to={`/productPage/${item.key}`}><img src={item.img} className="goodImg"></img></Link>
            </div>
            <div style={{margin: "20px 0px"}}>
              <div className="description name">{item.name.length>28?item.name.slice(0, 26)+"...":item.name}</div>
              <div className="description price">
                {`${item.price * (100 - item.discount) * 0.01} руб`}
                {item.discount !== 0 && (
                  <span className="crossed">{`${item.price} руб`}</span>
                )}
                {item.discount === 0 && (
                  <span className="disp0">{`${item.price} руб`}</span>
                )}
              </div>
            </div>
          </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
