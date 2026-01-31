import "./App.css";
import Header from "./Header.js";
import Footer from "./Footer.js";
import { Search } from "./Search.js";
import Bean from "./bean.js";
import MainPage from "./mainPage.js";
import { useEffect, useState, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Catalog from "./Catalog.js";
import About from "./About.js";
import { useInitUserStatus, UseInitBasket } from "./hooks/hooks.js";
import Order from "./order.js";
import ProductPage from "./ProductPage.js";
import { getDatabase, ref, get, push, set, query } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { setGoods } from "./store/GoodsSlice.js";
import { auth } from "./firebase.js";
import { setBean } from "./store/BeanSlice.js";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { CategorySharp, Description } from "@mui/icons-material";
import Preloader from "./Preloader.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setAuthorized } from "./store/AuthorizedSlice.js";


export default function App() {
  // useInitUserStatus(); //кастомный хук
  const dispatch = useDispatch();
  // const [fetching, setFetching] = useState(false);
  // let goods = useSelector(state => state.goods.goods);
  let firstRender = useRef(true);
  // const bean=useSelector(state=>state.bean.bean);


  let apiUrl = process.env.REACT_APP_API_URL;
  const queryClient = new QueryClient();

  // if(firstRender.current){
    UseInitBasket();
  //   firstRender.current = false;
  // }

  // useEffect(()=>console.log(bean), [bean]);

  const tryFetchUserData = async () => {
    try{
      const res = await fetch(`${apiUrl}/Users/me`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      console.log(res);
      let user = await res.json();
      dispatch(setAuthorized(user))
    } catch(ex) {
      console.log(ex.message);
    }
  }

  // useEffect(()=>{
  //   if(firstRender.current)
  //     tryFetchUserData()
  // }, []);
  
  // const fetchGoods = async () => {
  //   try {
  //     let res = await fetch(`${apiUrl}/Products`);
  //     let goods = await res.json();
  //     dispatch(setGoods(goods));
  //   } catch (error) {
  //     console.error("Ошибка при получении данных базы данных:", error);
  //   }
  // };

  // async function postGoods() {
  //   try{
  //   console.log(goods);
  //   let arr = [];
  //   let tempObj;
  //   let tempCharacteristics;

  //   goods.map(i => {
  //     tempCharacteristics = []
  //     console.log(i.charactertics);
  //     i.charactertics.map(char => {
  //       tempCharacteristics.push({name: char.name, description: char.desc})
  //     });
  //     tempObj = {
  //       name: i.name,
  //       Brand: i.brand,
  //       price: i.price,
  //       img: i.img,
  //       isNew: i.new,
  //       discount: i.discount,
  //       countToBuy: i.countToBuy,
  //       charactertics: tempCharacteristics,//null,
  //       description: i.description ,
  //       category: i.category,
  //       orders: null
  //     };
  //     arr.push(tempObj);
      
  //   })
    
  //   let headers = new Headers();
  //   headers.append("Content-Type", "application/json");
  //   await fetch("https://localhost:7046/Products", {
  //       method: 'POST',
  //       headers: headers,
  //       body: JSON.stringify(arr)
  //     }
  //   )

  //   } catch(err){
  //     console.log(err.message)
  //   }
  // }

  // async function fetchAll() {
  //   if(firstRender){
  //     setFetching(true);
    
  //     // await postGoods();
  //     // await fetchGoods();
  //     // if (!!uid) 
  //     // await fetchBean(uid);
  //     // else console.log("net");
  //     setFetching(false);
  //     firstRender = false;
  //   }
  // }

  // useEffect(() => {
  //   fetchAll();
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
    <div className="App">
      {/* {!fetching ? ( */}
        <>
          <Header></Header>
          <Routes>
            <Route path="/" element={<MainPage />}></Route>
            <Route path="/basket" element={<Bean />}></Route>
            <Route path="/catalog" element={<Search />}></Route>
            <Route
              path="/redactedCatalog/:brand/:category"
              element={<Search />}
            ></Route>
            <Route path="/productPage/:key" element={<ProductPage />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/order" element={<Order />}></Route>
          </Routes>
          <Footer></Footer>
        </>
      {/* ) : (
       <Preloader width = "100vw" height="100vh"/>
      )} */}
    </div>
    </QueryClientProvider>
  );
}
