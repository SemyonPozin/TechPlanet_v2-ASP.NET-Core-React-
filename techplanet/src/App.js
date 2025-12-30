
import "./App.css";
import Header from "./Header.js";
import Footer from "./Footer.js";
import { Search } from "./Search.js";
import Bean from "./bean.js";
import MainPage from "./mainPage.js";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Catalog from "./Catalog.js";
import About from "./About.js";
import { useUserStatus, useInitUserStatus } from "./hooks/hooks.js";
import Order from "./order.js";
import ProductPage from "./ProductPage.js";
import { getDatabase, ref, get, push, set, query } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { setGoods } from "./store/GoodsSlice.js";
import { auth } from "./firebase.js";
import { setBean } from "./store/BeanSlice.js";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const getUID = () => {
  try {
    return auth.currentUser.uid;
  } catch (error) {
    console.log("!!!" + error);
    return false;
  }
};

export default function App() {
  useInitUserStatus(); //кастомный хук

  const dispatch = useDispatch();
  const [fetching, setFetching] = useState(false);

  const fetchGoods = async () => {
    try {
      const snapshot = await get(query(ref(getDatabase(), `goods`)));
      if (snapshot.exists()) {
        dispatch(setGoods(snapshot.val()));
      } else {
        console.log("База данных пуста.");
      }
    } catch (error) {
      console.error("Ошибка при получении данных базы данных:", error);
    }
  };

  const fetchBean = async (uid) => {
    uid=getUID();
    console.log(uid)
    if(!uid)
      return;
    try {
      const snapshot = await get(
        query(ref(getDatabase(), `users/${uid}/basket`))
      );
      if (snapshot.exists()) {
        console.log(snapshot.val())
        dispatch(setBean(snapshot.val()));
      } else {
        console.log("База данных пуста.");
      }
    } catch (error) {
      console.error("Ошибка при получении данных базы данных:", error);
    }
  };

  async function fetchAll() {
    const uid = getUID();
    setFetching(true);
    await fetchGoods();
    // if (!!uid) 
      await fetchBean(uid);
    // else console.log("net");
    setFetching(false);
  }

  useEffect(() => {
    fetchAll();
  }, []);

  // const goods = useSelector((state) => state.goods.goods);

  // useEffect(() => {
  //   const initGoodsInDB = async () => {
  //     try {
  //       const db = getDatabase();
  //       for (const item of goods) {
  //         const itemRef = ref(db, `goods/${item.key}`);
  //         await set(itemRef, item);
  //       }
  //     } catch (error) {
  //       console.error('Ошибка при записи данных в базу данных:', error);
  //     }
  //   };

  //   initGoodsInDB();
  // }, [goods]);

  return (
    <div className="App">
      {!fetching ? (
        <>
          <Header></Header>
          <Routes>
            <Route path="/" element={<MainPage />}></Route>
            <Route path="/basket" element={<Bean />}></Route>
            <Route path="/catalog" element={<Search />}></Route>
            <Route
              path="/redactedCatalog/:brend/:category"
              element={<Catalog />}
            ></Route>
            <Route path="/productPage/:key" element={<ProductPage />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/order" element={<Order />}></Route>
          </Routes>
          <Footer></Footer>
        </>
      ) : (
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
        </Box>
      )}
    </div>
  );
}
