import { createSlice } from "@reduxjs/toolkit";

const chosenGoodsSlice=createSlice({
    name: "chosenGoods",
    initialState: {
        chosenGoods:[]
    },
    reducers: {
        reloadGoods(state, action){
            return {...state, chosenGoods: action.payload};
        }
    }
});

export const {reloadGoods}=chosenGoodsSlice.actions;

export default chosenGoodsSlice.reducer;
