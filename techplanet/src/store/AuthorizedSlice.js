import { createSlice } from "@reduxjs/toolkit";

const GoodsSlice=createSlice({
    name: "authorized",
    initialState: {
        authorized:false
    },
    reducers: {
        setAuthorized: (state, action) => {
            console.log(action.payload)
            return {...state, authorized: action.payload};
        }
    }
});

export const { setAuthorized } = GoodsSlice.actions;
export default GoodsSlice.reducer;