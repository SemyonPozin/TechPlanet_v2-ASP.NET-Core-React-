import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { changeBean, deleteFromBean } from "./store/BeanSlice";
import "./bean.css";
import Checkbox from '@mui/material/Checkbox';
import AuthorizationForm from "./AuthorizationForm";
import { setShowLog } from "./store/logMenuSlice";
import { Link } from "react-router-dom";
import { getDatabase, ref, set, get, query } from "firebase/database";
import { auth } from "./firebase";
import { useUserStatus } from "./hooks/hooks";

export default function Bean() {

  useUserStatus();
  const dispatch = useDispatch();
  const bean = useSelector((state) => state.bean.bean);
  let readyToOrder=bean.filter((item)=>{return item.addToOrder===true});
  const authorized = useSelector((state) => state.authorized.authorized); 
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // useEffect(() => {
  //   const handleBeforeUnload = (e) => {//это нужно для того чтобы состояние корзины не очищалось перед перезагрузкой из-за всплытия событий
  //     e.preventDefault();
  //   };
  //   window.addEventListener('beforeunload', handleBeforeUnload);
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);

  useEffect(()=>{
    if(!!authorized){
      const oRef=ref(getDatabase(), `users/${auth.currentUser.uid}/basket`);
      set(oRef, bean);
    }
  }, [bean])

  function changeBeanByCountToBuy(item, dir = 1) {
    const index = bean.findIndex((index) => index.id === item.id);
    if (index !== -1) {
      let tempCount = bean[index].countToBuy;
      tempCount += dir;
      dispatch(changeBean([index, tempCount, "countToBuy"]));
    }
  }

  function changeBeanByAddToOrder(e, item) {
    const index = bean.findIndex((index) => index.id === item.id);
    if (index !== -1) {
      let value;
      e.target.checked?value=true:value=false;
      dispatch(changeBean([index, value, "addToOrder"]));
    }
  }

  return (
    <div>
      {!authorized && (
        <div className="noAcc">
          <div className="needAcc">Необходимо войти в аккаунт</div>
          <div className="enter" onClick={()=>dispatch(setShowLog(true))}>Войти</div>
        </div>
      )}
      {!!authorized && bean.length > 0 && ( 
          <div className={ windowWidth < 850 ? "grid1 beanContainer" : "grid2 beanContainer"}>
          {readyToOrder.length>0 && <div className="toOrder">
            <Link to="/order"><div>К заказу</div></Link>
          </div>}
          {bean.map((item) => (
            <div className="beanItemContainer" key={Date.now()+Math.floor(Math.random() * 1000)}>
              <div className="absol">
                <div onClick={() => dispatch(deleteFromBean(item))}>
                  &#x2715;
                </div>
              </div>
              <div className="description">
                <img src={item.img} className="beanImg"></img>
              </div>
              <div className="seccol smallinfo">
                <div className="description nameBeanItem">
                  {item.name}
                </div>
                <div className="grid3 counter">
                    <div onClick={() => {item.countToBuy !== 0 ? changeBeanByCountToBuy(item, -1) : console.log(); }}>-</div>
                    <div>{item.countToBuy}</div>
                    <div onClick={() => changeBeanByCountToBuy(item)}>+</div>
                  </div>
                  <div className="beanItemPrice">{`${(item.countToBuy *item.price *(100 - item.discount) * 0.01).toFixed(2)} руб`}</div>
              </div>
              <div className="thirdcol">
                <Checkbox sx={{paddingTop: 0, paddingBottom: 0,}} checked={item.addToOrder===true} 
                onChange={(e)=>changeBeanByAddToOrder(e, item)}/>
              </div>
            </div>
          ))}
        </div>
      )}
      {!!authorized && bean.length === 0 && (
        <div className="notFound empty">Корзина пуста!</div>
      )}
    </div>
  );
}
