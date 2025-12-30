import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Radio from "@mui/material/Radio";
import "./order.css";
import { removeOrder, setOrder } from "./store/OrderSlice";
import { deleteFromBean } from "./store/BeanSlice";
import { getDatabase, ref, set } from "firebase/database";
import { getUID } from "./App";
import { useUserStatus } from "./hooks/hooks";
export default function Order(){
  useUserStatus();
  const dispatch=useDispatch();
  const bean = useSelector((state) => state.bean.bean);
  const nextOrder = bean.filter((item) => {
    return item.addToOrder === true;
  });
  const [orderTuning, setOrderTuning]=useState(true);
  const [choosingAdress, setChoosingAdress]=useState(false);
  const [finishingOrder, setFinishingOrder]=useState(false);
  const order=useSelector((state)=>state.orders.order);
  const authorized = useSelector((state) => state.authorized.authorized); 
  const navigate=useNavigate();
  useEffect(()=>{
    if(!authorized)
      navigate("/catalog");
  }, [authorized])
  useEffect(()=>{dispatch(setOrder(["goods", nextOrder]))}, [])//
  const findOrderPrice=()=>{
    if(order.length===0) return 0;
    else if(order.length===1) return order.goods[0].price;
    else{
      let temp = order.goods.reduce((prev, item) => {
        return prev + item.countToBuy*(item.price-(item.price*item.discount*0.01));
      }, 0)
      return temp;
    }
  }
  let orderPrice=findOrderPrice();
    if(order.delivery===true)
      orderPrice+=20;
  const nextPage=(delivery)=>{
    if(choosingAdress){
      setChoosingAdress(false);
      setFinishingOrder(true);
    }
    else{
      if(delivery){
        setOrderTuning(false);
        setChoosingAdress(true);
      }
      else{
        setOrderTuning(false);
        setFinishingOrder(true);
      }
    }
  }
  return(
    <div className="ordersContainer">
      {orderTuning && <OrderTune nextPage={nextPage}/>}
      {choosingAdress && <DeliveryOrder nextPage={nextPage}/>}
      {finishingOrder && <FinishOrder orderPrice={orderPrice} />}
    </div>
  )
}
export function OrderTune(props) {
  const [delivery, setDelivery] = useState(true);
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('20:00');
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const bean = useSelector((state) => state.bean.bean);
  let nextOrder = bean.filter((item) => {
    return item.addToOrder === true;
  });
  useEffect(() => {
    if (nextOrder.length === 0) navigate(`/basket`);
  }, [nextOrder.length]);
  useEffect(()=>{
    dispatch(setOrder(["delivery", delivery]))
  }, [delivery])
  return (
      <form className="obtainingForm">
        <div className="h">Способ получения</div>
        <div>
          Доставка (20 руб.)
          <Radio
            checked={delivery === true}
            onChange={() => setDelivery(true)}
            value="delivery"
            name="check"
            size="small"
          />
          Самовывоз
          <Radio
            checked={delivery === false}
            onChange={() => setDelivery(false)}
            value="yourself"
            name="check"
            size="small"
          />
        </div>
        {delivery === true && (
          <div>
            <div className="h">Выберите удобное время:</div>
            <div>
              {"с "}<input value={startTime} type="time" name="startTime" onChange={(e)=>setStartTime(e.target.value)}></input>
              {" до "}
              <input value={endTime} type="time" name="endTime" onChange={(e)=>setEndTime(e.target.value)}></input>
            </div>
          </div>
        )}
        <button onClick={() => {dispatch(setOrder(["time", [startTime, endTime]])); props.nextPage(delivery)}}>Далее</button>
      </form>
  );
}
export function DeliveryOrder(props) {
  const dispatch=useDispatch();
  const [region, setRegion]=useState("");
  const [district, setDistrict]=useState("");
  const [city, setCity]=useState("");

  const [street, setStreet]=useState("");
  const [house, setHouse]=useState("");
  const [flat, setFlat]=useState("");
    
    //const { register, handleSubmit } = useForm();
  
    const onSubmit = (e) => {
      e.preventDefault();
      const houseRegex = /^\d+[a-zA-Z]?$/;
      const flatRegex = /^-?\d+$/;
      if(flat.trim()!=='' && !flatRegex.test(flat)){
        alert("Некорректный номер квартиры!");
        return;
      }
      
      if(region.trim()==='' || district.trim()==='' || city.trim()==='' || street.trim()==='' || house.trim()===''){
        alert("Введите все нужные данные"); return; }
        if(!houseRegex.test(house)){
          alert("Некорректный номер дома!");
          return;
        }
      dispatch(setOrder(["address", `${region} обл. ${district} р-н, г.${city}, ул.${street}, д.${house}${flat.trim()!==''?', кв.'+flat:''}`]));
      props.nextPage(false);
    };    
  return (
    <div>
      <form className="obtainingForm">
        <div className="h">Введите адрес доставки</div>
          <div className="adressInputs">
            <div>
            <input placeholder="Область" onChange={(e)=>setRegion(e.target.value)}></input>
            </div>
              <div>
              <input placeholder="Район" onChange={(e)=>setDistrict(e.target.value)}></input>
              </div>
              <div>
              <input placeholder="Город" onChange={(e)=>setCity(e.target.value)}></input>
              </div>
              <div>
              <input placeholder="Улица" onChange={(e)=>setStreet(e.target.value)}></input>
              </div>
              
              <div>
              <input placeholder="Дом" onChange={(e)=>setHouse(e.target.value)}></input>
              </div>
              <div>
              <input placeholder="Квартира" onChange={(e)=>setFlat(e.target.value)}></input>
              </div>
          </div>
        <button onClick={(e)=>onSubmit(e)}>Далее</button>
      </form>
    </div>
  );
}
export function FinishOrder(props) {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const order=useSelector((state)=>state.orders.order)
  useEffect(()=>{
    const uid=getUID();
    dispatch(setOrder(["price", props.orderPrice.toFixed(2)]));
    dispatch(setOrder(["uid", uid]))
  }, [])
  useEffect(()=>{
    const finish=async ()=>{
      if(order.date!==null){
      const oRef=ref(getDatabase(), `orders/${order.date+order.uid+"||"+Math.floor(Math.random() * 10000) + 1}`);
      set(oRef, order);//await
      dispatch(removeOrder());
      navigate("/catalog");
      alert("Заказ оформлен");
    }}
    finish();
  }, [order])
    const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch(setOrder(["date", new Date()]))
    order.goods.map((item)=>{
      dispatch(deleteFromBean(item));
    })
  }
  return (
      <form className="finishForm" onSubmit={(e)=>handleSubmit(e)}>
        <div className="h" style={{textAlign: "center"}}>Подтверждение</div>
        <div className="goodsList">
          {order.goods.map((item)=>(
            <div className="listItem" key={item.id}>
              <div className="itemImg">
                <img src={item.img}></img>
              </div>
                <div className="ListItemInfo">
                  <div className="ListItemName">{item.name}</div>
                  <div className="ListItemPrice">{(item.countToBuy*(item.price-(item.price*item.discount*0.01))).toFixed(2)} руб.</div>
                </div>
            </div>
          ))}
          {order.delivery ===true && <div className="listItem">
            <div>Доставка: </div>
            <div>20 руб</div>
          </div>}
        </div>
        <input type="submit" value={`Заказать, ${props.orderPrice.toFixed(2)} руб`} ></input>
      </form>
  );
}
