import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import beanReducer from "./BeanSlice"
import priceFilter from "./PriceFilterSlice";
import GoodsSlice from "./GoodsSlice";
import chosenGoodsSlice from "./chosenGoodsSlice";
import AuthorizedSlice from "./AuthorizedSlice";
import showLog from "./logMenuSlice";
import orders from "./OrderSlice"

export default configureStore({
    reducer: {
        bean: beanReducer,
        pricefilt: priceFilter,
        goods: GoodsSlice,
        chosenGoods: chosenGoodsSlice,
        authorized: AuthorizedSlice,
        showLog: showLog,
        orders: orders,
    }
})