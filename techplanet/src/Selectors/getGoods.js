import { createSelector } from "@reduxjs/toolkit";

const goodsState=(state)=>state.goods.goods;

export const getGoods=createSelector(goodsState,
    (goods)=>{return goods;}
)