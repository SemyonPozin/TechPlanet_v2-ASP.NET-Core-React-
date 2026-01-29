import { CurtainsOutlined } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";
import { produce } from 'immer';


const BeanSlice=createSlice({
    name: "bean",
    initialState: {
        bean: {
            userId: null,
            basket: []
        }
    },
    reducers: {
        addToBean(state, action){
            state.bean.basket.push(action.payload);
        },
        deleteFromBean(state, action){
            let temp=state.bean.basket.filter((item)=>{return item.id!==action.payload.id});
            // console.log(temp)
            return{...state,
                bean: {
                    ...state.bean,
                    basket: temp
                }
            }
        },
        changeBean(state, action) {
        const [index, updatedItem, prop] = action.payload;
        const newBeanArray = [...state.bean.basket];
        newBeanArray[index] = {
            ...newBeanArray[index],
            [prop]: updatedItem
        };
        return {
            ...state,
            bean: {
                userId: state.bean.userId, // Замените bean на state.bean
                basket: newBeanArray
            }
        };
        },
        setBean(state, action){
            // const temp=Array.from(action.payload);
            return {...state, bean: action.payload}
        }
    }
});

export const {addToBean, deleteFromBean, changeBean, setBean}=BeanSlice.actions;

export default BeanSlice.reducer;