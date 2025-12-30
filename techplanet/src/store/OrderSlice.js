import { createSlice } from "@reduxjs/toolkit";
import { getUID } from "../App";

const orderSlice=createSlice({
    name: "orders",
    initialState: {
        order:{
            goods: [],
            uid: null,
            done: false,
            price: 0,
            date: null,
            delivery: null,
            address: null,
            time: null,
        }
    },
    reducers: {
        setOrder: (state, action) => {
            console.log(action.payload)
            return {...state,
                order: { ...state.order, [action.payload[0]]: action.payload[1]}
              };
        },
        removeOrder: (state)=>{
            state.order={
                goods: [],
                uid: null,
                done: false,
                price: 0,
                date: null,
                delivery: null,
                address: null,
                time: null,
            };
        }
    }
});


export const { setOrder, removeOrder } = orderSlice.actions;
export default orderSlice.reducer;