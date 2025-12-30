import "./ProductPage.css";
import { useParams } from "react-router-dom";
import { getDatabase, ref, push, set, get, query } from "firebase/database";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToBean } from "./store/BeanSlice";
import Slider from "react-slick";
import SliderCatalog from "./SliderCatalog";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { create } from "@mui/material/styles/createTransitions";

function createStrings(windowWidth, goodData) {
  const stringsArr = [];
  let temp = "";
  let pad;
  let lettersInString;
  if (windowWidth > 1350) lettersInString = 65;
  else if (windowWidth > 1270) lettersInString = 55;
  else if (windowWidth > 1190) lettersInString = 45;
  else if (windowWidth > 1150) lettersInString = 40;
  else if (windowWidth > 730) lettersInString = 100;
  else if (windowWidth > 600) lettersInString = 80;
  else if (windowWidth >= 380) lettersInString = 50;
  else lettersInString = 40;

  console.log("data "+goodData);
  console.log("width: "+ windowWidth)
  try {goodData.charactertics.map((item) => {
    temp += item.name;
    pad = lettersInString - item.desc.length;
    temp = temp.padEnd(pad, "-");
    temp += item.desc;
    stringsArr.push(temp);
    temp = "";
  });}
  catch{
    console.log(goodData)
  }
  console.log("fin" + stringsArr);
  return stringsArr;
}

export default function ProductPage() {
  const [fetching, setFetching] = useState(false);
  const key = useParams().key;
  if (key === undefined) console.error("не найден");

  const dispatch = useDispatch();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const goods = useSelector((state) => state.goods.goods);
  const bean = useSelector((state) => state.bean.bean);
  const goodData = goods[parseInt(key)];
  const authorized = useSelector((state) => state.authorized.authorized);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (goods.length!==0) {
      setFetching(false);
    } else {
      setFetching(true);
    }
  }, [goods]);

  const add = (e, item) => {
    if(!authorized){
      alert("Необходимо войти в аккаунт!");
      return;
    }
    let container = e.target;
    try {
      container.querySelector("path").classList.add("cls-2");
    } catch {
      e.target.classList.add("cls-2");
    }

    let flag = true;
    bean.forEach((bItem) => {
      if (bItem.id === item.id) {
        flag = false;
      }
    });
    if (flag) dispatch(addToBean(item));

    setTimeout(() => {
      try {
        container.querySelector("path").classList.remove("cls-2");
      } catch {
        e.target.classList.remove("cls-2");
      }
    }, 70);
  };

  // module.exports=createStrings;

  let stringsArr;
  if (!fetching) stringsArr = createStrings(windowWidth, goodData);

  let brendArr=[];

  goods.map((item)=>{
      if(item.brend===goodData.brend)
        brendArr.push(item);
      if(brendArr.length===2)
        return;
  })

  console.log(brendArr)

  if (!!goodData) {
    return (
      <div className="productPage">
        <div className="productContainer">
          <div className="imgContainer">
            <div className="absol">
              {goodData.new && <div className="new">NEW!</div>}
              {goodData.discount !== 0 && (
                <div className="discount"> -{goodData.discount}%</div>
              )}
            </div>
            <img src={goodData.img} style={{ height: "40vh" }}></img>
          </div>
          <div className="description">
            <div className="name">{goodData.name}</div>
            <div className="priceContainer">
              <div className="price">{`${
                goodData.price * (100 - goodData.discount) * 0.01
              } руб`}</div>
              {goodData.discount !== 0 && (
                <div className="crossed">{goodData.price} руб</div>
              )}
            </div>
            <div className="grid1">
              <div className="name h">Описание</div>
              <p>{goodData.description}</p>
            </div>
            <div className="beanButton" onClick={(e) => add(e, goodData)}>
              <svg
                id="Layer_1"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 122.88 104.43"
                width="25px"
              >
                <defs>
                  <style>{`.cls-1{fill-rule:evenodd; fill: black} .cls-2{fill: #a79191}`}</style>
                </defs>
                <title>add-to-cart</title>
                <path
                  className="cls-1"
                  d="M97,0A25.9,25.9,0,1,1,78.67,7.59,25.79,25.79,0,0,1,97,0ZM3.66,10.89a3.71,3.71,0,0,1,0-7.42H9.11A17.3,17.3,0,0,1,18,5.81c4.92,3.12,5.79,7.57,7,12.59H66.7a31,31,0,0,0-.9,7.33H27.14L35.5,57.19H94.77l0-.18c.72.05,1.44.08,2.17.08a31.59,31.59,0,0,0,5.46-.48l-1.29,5.18a3.62,3.62,0,0,1-3.57,2.82H37.47c1.32,4.88,2.63,7.51,4.42,8.74,2.16,1.4,5.92,1.5,12.21,1.4H96.64a3.67,3.67,0,1,1,0,7.33H54.19c-7.79.09-12.58-.09-16.44-2.63s-6-7.14-8.07-15.31h0L17.09,16.52c0-.09,0-.09-.09-.19a6.51,6.51,0,0,0-2.82-4.22A9.51,9.51,0,0,0,9,10.89H3.66ZM60.87,33.47a2.6,2.6,0,0,1,5.11,0V47.63a2.6,2.6,0,0,1-5.11,0V33.47Zm-15.3,0a2.6,2.6,0,0,1,5.11,0V47.63a2.6,2.6,0,0,1-5.11,0V33.47ZM85.66,86.4a9,9,0,1,1-9,9,9,9,0,0,1,9-9Zm-39.55,0a9,9,0,1,1-9,9,9,9,0,0,1,9-9Zm64.08-62.91V28.3a2.09,2.09,0,0,1-2.07,2.07h-6.66V37a2.08,2.08,0,0,1-2.07,2.07H94.58A2.07,2.07,0,0,1,92.51,37V30.37H85.85a2.08,2.08,0,0,1-2.07-2.07V23.49a2.07,2.07,0,0,1,2.07-2.07h6.66V14.76a2.07,2.07,0,0,1,2.07-2.07h4.81a2.08,2.08,0,0,1,2.07,2.07v6.66h6.66a2.08,2.08,0,0,1,2.07,2.07Z"
                ></path>
              </svg>
            </div>
          </div>
          <div className="charactertics grid1">
            <div
              className="name h"
              style={{ margin: windowWidth < 1150 ? "25px 0" : "0" }}
            >
              Характеристики
            </div>
            <table>
              <tbody>
              {stringsArr.map((item) => (
                <tr>
                  <td>{item}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
        {(brendArr.length>1) && <div style={{ display: "grid", padding: "20px 0px" }}>
          <div
            className="name"
            style={{
              margin: "25px 0",
              fontSize: "20px",
              justifySelf: "center",
              userSelect: "none"
            }}
          >
            Также от этого производителя
          </div>
           <SliderCatalog
            filter={{ prop: "brend", filter: goodData.brend }}
            goods={goods}
          ></SliderCatalog>
        </div>}
      </div>
    );
  } else {
    if (fetching) {
      <Box
        sx={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>;
    } else return <div>Товар не найден</div>;
  }
}
