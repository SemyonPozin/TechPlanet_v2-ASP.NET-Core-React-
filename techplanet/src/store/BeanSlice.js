import { CurtainsOutlined } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";
import { produce } from 'immer';


const BeanSlice=createSlice({
    name: "bean",
    initialState: {
        bean: []
    },
    reducers: {
        addToBean(state, action){
            state.bean.push(action.payload);
        },
        deleteFromBean(state, action){
            let temp=state.bean.filter((item)=>{return item.id!==action.payload.id});
            // console.log(temp)
            return{...state,
                bean: temp
            }
        },
        changeBean(state, action) {
            const [index, updatedItem, prop ] = action.payload;
            // Создаем копию массива state.bean
            const newBeanArray = [...state.bean];
            // Обновляем нужный элемент в копии массива
            newBeanArray[index] = {
              ...newBeanArray[index],
              [prop]: updatedItem
            };
            // Возвращаем новый объект состояния с обновленным массивом
            return {
              ...state,
              bean: newBeanArray
            };
        },
        setBean(state, action){
            const temp=Array.from(action.payload);
            return {...state, bean: temp}
        }
    }
});

export const {addToBean, deleteFromBean, changeBean, setBean}=BeanSlice.actions;

export default BeanSlice.reducer;