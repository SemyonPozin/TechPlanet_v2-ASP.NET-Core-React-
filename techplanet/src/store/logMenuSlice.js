import { createSlice } from "@reduxjs/toolkit";

const showLogSlice=createSlice({
    name: "showLogMenu",
    initialState: {
        showLogMenu:true
    },
    reducers: {
        setShowLog: (state, action) => {
            return {...state, showLogMenu: action.payload};
        }
    }
});

export const { setShowLog } = showLogSlice.actions;
export default showLogSlice.reducer;