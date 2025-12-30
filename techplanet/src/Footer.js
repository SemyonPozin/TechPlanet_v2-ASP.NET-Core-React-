import "./Footer.css";
import "./App.css";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Footer() {
  const location=useLocation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const bean = useSelector((state) => state.bean.bean);
  const chosenGoods = useSelector((state) => state.chosenGoods.chosenGoods);


  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const tagName = "footer";
  const className = "foot";

  useEffect(() => {
    let footer = document.querySelector(tagName);
    footer.classList.remove(className);
    const rect = footer.getBoundingClientRect();
    const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    // if(rect.bottom >= viewHeight && footer.classList.contains(className))
    //   footer.classList.remove(className);
    // else if(rect.bottom < viewHeight){
    //     if(footer.classList.contains(className))
    //         return;
    //     else
    //         footer.classList.add(className);
    // }
    if(rect.bottom<viewHeight)
      footer.classList.add(className);

    if(location.pathname==="/")
      footer.classList.remove(className);
  }, [bean, location.pathname, chosenGoods]);

  return (
    <footer>
      <div className={windowWidth > 440 ? "paddBottom sortItem" : "sortItem"}>
        <div>
          <Link className="link" to={`redactedCatalog/all/phones`}>
            Телефоны
          </Link>
        </div>
        <div className="brend">
          <Link className="link" to={`redactedCatalog/Apple/phones`}>
            Apple
          </Link>
        </div>
        <div className="brend">
          <Link className="link" to={`redactedCatalog/Samsung/phones`}>
            Samsung
          </Link>
        </div>
        <div className="brend">
          <Link className="link" to={`redactedCatalog/Honor/phones`}>
            Honor
          </Link>
        </div>
        <div className="brend">
          <Link className="link" to={`redactedCatalog/Xiaomi/phones`}>
            Xiaomi
          </Link>
        </div>
      </div>
      <div className={windowWidth > 440 ? "paddBottom sortItem" : "sortItem"}>
        <div>
          <Link className="link" to={`redactedCatalog/all/tablets`}>
            Планшеты
          </Link>
        </div>
        <div className="brend">
          <Link className="link" to={`redactedCatalog/Lenovo/tablets`}>
            Lenovo
          </Link>
        </div>
        <div className="brend">
          <Link className="link" to={`redactedCatalog/Apple/tablets`}>
            Apple
          </Link>
        </div>
        <div className="brend">
          <Link className="link" to={`redactedCatalog/Honor/tablets`}>
            Honor
          </Link>
        </div>
        <div className="brend">
          <Link className="link" to={`redactedCatalog/Samsung/tablets`}>
            Samsung
          </Link>
        </div>
      </div>
      <div className="paddBottom sortItem">
        <div>
          <Link className="link" to={`redactedCatalog/all/headphones`}>
            Наушники
          </Link>
        </div>
        <div className="brend">
          <Link className="link" to={`redactedCatalog/Marshall/headphones`}>
            Marshall
          </Link>
        </div>
        <div className="brend">
          <Link className="link" to={`redactedCatalog/Hoco/headphones`}>
            Hoco
          </Link>
        </div>
        <div className="brend">
          <Link className="link" to={`redactedCatalog/Apple/headphones`}>
            Apple
          </Link>
        </div>
        <div className="brend">
          <Link className="link" to={`redactedCatalog/Phillips/headphones`}>
            Phillips
          </Link>
        </div>
      </div>
      <div className="sortItem accessories">
        <div>
          <Link className="link" to={`redactedCatalog/all/accessories`}>
            Аксессуары
          </Link>
        </div>
        <div className="brend">
          <Link className="link" to={`redactedCatalog/Xiaomi/accessories`}>
            Xiaomi
          </Link>
        </div>
        <div className="brend">
          <Link className="link" to={`redactedCatalog/Apple/accessories`}>
            Apple
          </Link>
        </div>
      </div>
    </footer>
  );
}
