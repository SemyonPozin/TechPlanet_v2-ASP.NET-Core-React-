import SliderCatalog from "./SliderCatalog";
import Footer from "./Footer";
import Header from "./Header";
import { getGoods } from "./Selectors/getGoods";
import { useSelector } from "react-redux";



export default function MainPage(){
    const goods = useSelector(getGoods);
    return(
        <div style={{display: "grid", padding: "20px 0px"}}>
            <h2 style={{justifySelf: "center"}}>Акции</h2>
            <SliderCatalog filter={{prop: "discount", filter: true}} goods={goods}></SliderCatalog>
            <h2 style={{justifySelf: "center"}}>Новинки</h2>
            <SliderCatalog filter={{prop: "new", filter: true}} goods={goods}></SliderCatalog>
        </div>
    )
}