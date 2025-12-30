import "./Header.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorizationForm from "./AuthorizationForm";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setShowLog } from "./store/logMenuSlice";

export default function Header() {
  const dispatch=useDispatch();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [menuOpened, setMenuOpened] = useState(false);
  const autMenuOpened=useSelector((state) => state.showLog.showLogMenu);
  const location=useLocation();
  const bean=useSelector(state=>state.bean.bean);
  const authorized = useSelector((state) => state.authorized.authorized); 
  
  useEffect(()=>{
    if(!!autMenuOpened)
      // setAutMenuOpened(false);
    dispatch(setShowLog(false));
  }, [location.pathname])

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [svgFill, setSvgFill] = useState("rgb(138, 211, 230)");

  function changeFill() {
    setSvgFill("rgb(190, 242, 255)");
  }

  function changeFillBack() {
    setSvgFill("rgb(138, 211, 230)");
  }

  return (
    <header>
      <div className="logo">
      <Link to='/' className="headerLink">Tech Planet</Link>
      </div>
      {windowWidth < 725 && (
        <div className="menumobile" >
          {!menuOpened && <div className="hamb" onClick={()=>setMenuOpened(true)}>&#9776;</div>}
          {menuOpened && <div className="abs">
          <div className="cross" onClick={()=>setMenuOpened(false)}>&#x2715;</div>
            <div className="point" onClick={()=>setMenuOpened(false)}><Link to='/catalog' className="headerLink">Каталог</Link></div>
          <div className="point" onClick={()=>setMenuOpened(false)}>
            <Link to='/basket' className="headerLink">Корзина</Link>
          {(!!bean.length && authorized) && <div className={bean.length>9?"beanCountMobile outline":"beanCountMobile"}>{bean.length>99?"99+":bean.length}</div>}
          </div>
          <div className="point" onClick={()=>setMenuOpened(false)}><Link to='/about' className="headerLink">О нас</Link></div>
          <div className="point" onClick={()=>{setMenuOpened(false); dispatch(setShowLog(true));}}>
            <svg
              id="key"
              onMouseOver={changeFill}
              onMouseLeave={changeFillBack}
            //   xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              height="30"
              viewBox="0 1 24 24"
              style={{ fill: svgFill }}
            >
              <path d="M 7 5 C 3.134 5 0 8.134 0 12 C 0 15.866 3.134 19 7 19 C 10.170669 19 12.846171 16.890989 13.707031 14 L 18 14 L 18 17 L 22 17 L 22 14 L 24 14 L 24 10 L 13.707031 10 C 12.846171 7.1090112 10.170669 5 7 5 z M 7 9 C 8.657 9 10 10.343 10 12 C 10 13.657 8.657 15 7 15 C 5.343 15 4 13.657 4 12 C 4 10.343 5.343 9 7 9 z"></path>
            </svg>
          </div>
          </div>}
        </div>
      )}
      { windowWidth>=725 && (<div className="menu">
      <div className="point" ><Link to='/catalog' className="headerLink">Каталог</Link></div>
          <div className="point" >
            <Link to='/basket' className="headerLink">Корзина</Link>
          {(!!bean.length && authorized) && <div className={bean.length>9?"beanCount outline":"beanCount"}>{bean.length>99?"99+":bean.length}</div>}
          </div>
          <div className="point" ><Link to='/about' className="headerLink">О нас</Link></div>
          <div className="point" onClick={()=>dispatch(setShowLog(true))} >
            <svg
              id="key"
              onMouseOver={changeFill}
              onMouseLeave={changeFillBack}
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              style={{ fill: svgFill}}
            >
              <path d="M 7 5 C 3.134 5 0 8.134 0 12 C 0 15.866 3.134 19 7 19 C 10.170669 19 12.846171 16.890989 13.707031 14 L 18 14 L 18 17 L 22 17 L 22 14 L 24 14 L 24 10 L 13.707031 10 C 12.846171 7.1090112 10.170669 5 7 5 z M 7 9 C 8.657 9 10 10.343 10 12 C 10 13.657 8.657 15 7 15 C 5.343 15 4 13.657 4 12 C 4 10.343 5.343 9 7 9 z"></path>
            </svg>
          </div>
      </div>)
      }
      {autMenuOpened && <AuthorizationForm></AuthorizationForm>}
    </header>
  );
}

