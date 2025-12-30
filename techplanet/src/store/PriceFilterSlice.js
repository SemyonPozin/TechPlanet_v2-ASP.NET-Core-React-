import { createSlice } from "@reduxjs/toolkit";

const PriceFilterSlice=createSlice({
    name: "priceFilter",
    initialState: {
        priceFilter: [0, 5000]
    },
    reducers: {
        setFilter(state, action){
            return {...state, priceFilter: [...action.payload]};
        }
    }
});

export const {setFilter}=PriceFilterSlice.actions;

export default PriceFilterSlice.reducer;