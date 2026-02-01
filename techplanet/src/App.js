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
import { setUserId } from "./store/BeanSlice.js";


export default function App() {
  const dispatch = useDispatch();
  let firstRender = useRef(true);
  const userId = useSelector(state => state.bean.bean).userId;
    UseInitBasket(userId);
  // const bean=useSelector(state=>state.bean.bean);


  let apiUrl = process.env.REACT_APP_API_URL;
  const queryClient = new QueryClient();

  // if(firstRender.current){
    // UseInitBasket();
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
      if(!res.ok) throw new Error("failed to load user")
      let user = await res.json();
      dispatch(setAuthorized(user));
      dispatch(setUserId(user.id));
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    if(firstRender.current){
      tryFetchUserData();
      firstRender.current = false;
    }
  }, []);

  // useEffect(() => {
  //   // if(userId)
  //     UseInitBasket();
  // }, [userId])

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
