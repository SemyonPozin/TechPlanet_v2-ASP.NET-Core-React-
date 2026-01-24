    import SliderCatalog from "./SliderCatalog";
    import Footer from "./Footer";
    import Header from "./Header";
    import { getGoods } from "./Selectors/getGoods";
    import { useSelector } from "react-redux";
    import { Suspense, useEffect, useRef, useState } from "react";
    import Preloader from "./Preloader.js";

    export default function MainPage(){
        let firstRender = useRef(true);
        let apiUrl = process.env.REACT_APP_API_URL;
        let [newGoods, setNewGoods] = useState();
        let [discountGoods, setDiscountGoods] = useState();
        let [loading, setLoading] = useState(true);

        useEffect(()=>{
            async function load() {
                if(firstRender.current){
                    try{
                        // console.log(`${apiUrl}/Products/filters?isNew=true`);
                        const [newRes, discountRes] = await Promise.all([
                            fetch(`${apiUrl}/Products/filters?isNew=true`),
                            fetch(`${apiUrl}/Products/filters?withDiscount=true`)
                        ]);
                        
                        if(!newRes.ok || !discountRes.ok){
                            console.log("error");
                            return;
                        }
                        // console.log(newRes)
                        let newGoods = await newRes.json();
                        let discountGoods = await discountRes.json();
                        console.log(discountGoods)

                        setDiscountGoods(discountGoods);
                        setNewGoods(newGoods);
                    } catch(err){
                        console.log(err.message)
                        return;
                    }

                firstRender.current = false;
                setLoading(false);
                }     
            }
            
            load()
        }, [])

        if(loading){
            return <Preloader width = "100vw" height="10vh"/>
        } else{
           return( <div style={{display: "grid", padding: "20px 0px"}}>
                <h2 style={{justifySelf: "center"}}>Акции</h2>
                <SliderCatalog goods={newGoods}></SliderCatalog>
                <h2 style={{justifySelf: "center"}}>Новинки</h2>
                <SliderCatalog goods={discountGoods}></SliderCatalog>
            </div>
        )}  
    }