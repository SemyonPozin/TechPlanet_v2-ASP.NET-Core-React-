import { createSlice } from "@reduxjs/toolkit";

const orderSlice=createSlice({
    name: "orders",
    initialState: {
        order:{
            products: [],
            userId: null,
            done: false,
            price: 0,
            date: null,
            delivery: null,
            address: null,
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
                products: [],
                userId: null,
                done: false,
                price: 0,
                date: null,
                delivery: null,
                address: null,
            }
        }
    }
});


export const { setOrder, removeOrder } = orderSlice.actions;
export default orderSlice.reducer;