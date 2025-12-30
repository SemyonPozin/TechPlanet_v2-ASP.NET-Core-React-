import "./Catalog.css";
import { useDispatch, useSelector } from "react-redux";
import { addToBean } from "./store/BeanSlice";
import { useEffect, useState } from "react";
import "./store/GoodsSlice";
import { useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { reloadGoods } from "./store/chosenGoodsSlice";
import { getGoods } from "./Selectors/getGoods";
import { Link } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";
import { auth } from "./firebase";

const paginationPerPage = 12;

export default function Catalog({
  request,
  priceValue,
  brendValue,
  categoryValue,
}) {
  const goods = useSelector(getGoods);
  const bean = useSelector((state) => state.bean.bean);
  const authorized = useSelector((state) => state.authorized.authorized);
  const [currPage, setCurrPage] = useState(1);
  let lastItemIndex = currPage * paginationPerPage;
  let firstItemIndex = lastItemIndex - paginationPerPage;
  const changePage = (e, num) => {
    setCurrPage(num);
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const dispatch = useDispatch();
  console.log(bean)

  if (priceValue === undefined) priceValue = [1, 5000];
  if (request === undefined) request = "";

  const { brend, category } = useParams();
  if (brend !== undefined) brendValue = brend;
  if (category !== undefined) categoryValue = category;

  useEffect(() => {
    changePage(null, 1);
  }, [request, priceValue, brendValue, categoryValue]);

  useEffect(()=>{
    if(!!authorized){
      const oRef=ref(getDatabase(), `users/${auth.currentUser.uid}/basket`);
      set(oRef, bean);
    }
  }, [bean])

  const add = async (e, item) => {
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
    if (flag) 
      dispatch(addToBean(item));

    setTimeout(() => {
      try {
        container.querySelector("path").classList.remove("cls-2");
      } catch {
        e.target.classList.remove("cls-2");
      }
    }, 70);
    console.log(bean)
    console.log(auth.currentUser.uid)
    // const oRef=ref(getDatabase(), `users/${auth.currentUser.uid}/basket`);
    // await set(oRef, [...bean, item]);//temp
  };

  let chosenGoods = new Array();
  goods.map((item) => {
    if (
      item.price >= priceValue[0] &&
      item.price <= priceValue[1] &&
      (item.category === categoryValue || categoryValue === "all") &&
      (item.brend === brendValue || brendValue === "all") &&
      (item.name.toLowerCase().includes(request.toLowerCase()) ||
        !request ||
        request === "")
    )
      chosenGoods.push(item);
  });
  const filteredGoods = chosenGoods;
  chosenGoods = chosenGoods.slice(firstItemIndex, lastItemIndex);
  dispatch(reloadGoods(chosenGoods));

  const pagesCount = Math.ceil(filteredGoods.length / paginationPerPage);

  return (
    <div className="goodsContainer">
      {chosenGoods.map((item) => (
        <div className="itemContainer" key={item.id}>
          <div className="absol">
            {item.new && <div className="new">NEW!</div>}
            {item.discount !== 0 && (
              <div className="discount"> -{item.discount}%</div>
            )}
          </div>
          <div className="description">
            <Link to={`/productPage/${item.key}`}>
              <img src={item.img} className="goodImg"></img>
            </Link>
          </div>
          <div>
            <div className="description name">{item.name}</div>
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
          <div className="beanButton" onClick={(e) => add(e, item)}>
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
      ))}
      {chosenGoods.length === 0 && (
        <div className="notFound">Ничего не найдено!</div>
      )}
      {filteredGoods.length>12 && (
        <Pagination
          count={pagesCount}
          defaultPage={1}
          boundaryCount={2}
          onChange={changePage}
        ></Pagination>
      )}
    </div>
  );
}
