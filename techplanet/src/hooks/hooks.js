import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthorized } from '../store/AuthorizedSlice.js';
import firebaseApp from '../firebase.js';
import { useEffect, useCallback } from 'react';
import { setBean } from '../store/BeanSlice.js';

export const useUserStatus=()=>{
    const dispatch = useDispatch();
  
    function authStateChanged(user){
      const temp=user!==null?{displayName: user.displayName,
        mail: user.mail,
        uid: user.uid,}:null;
        // if(!user)
        //   dispatch(setBean([]));
      dispatch(setAuthorized(temp))
    }
  
    useEffect(()=>{
      onAuthStateChanged(getAuth(firebaseApp), authStateChanged);
    }, [])
  
}

export const useInitUserStatus = () => {
  const dispatch = useDispatch();

  const handleAuthStateChanged = (user) =>
  {
    const temp=user!==null?{displayName: user.displayName,
      mail: user.mail,
      uid: user.uid,}:null;
    dispatch(setAuthorized(temp));
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(firebaseApp), handleAuthStateChanged);
    return unsubscribe;
  }, [handleAuthStateChanged]);
};

// export const UseInitBasket = () => {
//   // useEffect(()=>{
//     const dispatch = useDispatch();
//     const user = useSelector(state => state.authorized.authorized);
//     let basket;
//     if(user != null &&
//       user.Id == JSON.parse(localStorage.getItem("basket")).userId){
//       basket = JSON.parse(localStorage.getItem("basket"))
//     } else {
//       basket = JSON.parse(sessionStorage.getItem("basket"))
//     } 

//     console.log(basket)
    
//     basket = basket && basket.length ? basket : {
//       userId: null,
//       basket: []
//     }

//     dispatch(setBean(basket))
//   // }, [])
// }

export const UseInitBasket = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.authorized.authorized);

  // Получаем basket из localStorage или sessionStorage
  const localBasketRaw = localStorage.getItem("basket");
  const sessionBasketRaw = sessionStorage.getItem("basket");

  let basket = null;

  if (localBasketRaw) {
    const localBasket = JSON.parse(localBasketRaw);
    if (user && localBasket.userId === user.Id) {
      basket = localBasket;
    }
  }

  if (!basket && sessionBasketRaw) {
    basket = JSON.parse(sessionBasketRaw);
  }

  // Если basket всё ещё null или пустой, создаём пустой
  basket = basket && Object.keys(basket).length ? basket : { userId: null, basket: [] };

  console.log(basket);
  dispatch(setBean(basket));
};
