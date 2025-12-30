import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useDispatch } from 'react-redux';
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
        if(!user)
          dispatch(setBean([]));
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