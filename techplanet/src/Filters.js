import Catalog from "./Catalog";
import { Search } from "./Search";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useEffect, useState, useMemo } from "react";
import "./Filters.css";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "./store/PriceFilterSlice";
import Radio from "@mui/material/Radio";

export default function Filters({ request }) {
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [showBrendFilter, setShowBrendFilter] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [brendFilter, setBrendFilter] = useState("all");

  const goods = useSelector((state) => state.goods.goods);
  const priceFilter = useSelector((state) => state.pricefilt.priceFilter);

  const brendsCollection = useMemo(() => {
    //оптимизация c помощью хука useMemo
    let brendsCollection = new Set();

    for (let i = 0; i < goods.length; i++) {
      brendsCollection.add(goods[i].brend);
    }

    return (brendsCollection = Array.from(brendsCollection));
  }, [goods]);

  // console.log('price: '+priceFilter)
  // console.log('category: '+categoryFilter)
  // console.log('brend: '+brendFilter)
  // console.log('request: '+request)

  return (
    <div className="filtersComponent">
      <div className="filtersContainer">
        <div className="filter">
          <div
            onClick={() => {
              setShowPriceFilter(!showPriceFilter);
              setShowCategoryFilter(false);
              setShowBrendFilter(false);
            }}
            className="filtName"
          >
            Цена {!showPriceFilter ? "▼" : "▲"}
          </div>
          <div style={{ display: showPriceFilter ? "grid" : "none" }}>
            <MinimumDistanceSlider></MinimumDistanceSlider>
          </div>
        </div>
        <div className="filter">
          <div
            onClick={() => {
              setShowCategoryFilter(!showCategoryFilter);
              setShowPriceFilter(false);
              setShowBrendFilter(false);
            }}
            className="filtName"
          >
            Категория {!showCategoryFilter ? "▼" : "▲"}
          </div>
          {showCategoryFilter && (
            <div className="catFilter">
              <form>
                <label>
                  {" "}
                  Телефоны
                  <input
                    type="radio"
                    name="category"
                    onChange={() => setCategoryFilter("phones")}
                    checked={categoryFilter === "phones"}
                  ></input>
                </label>
                <label>
                  {" "}
                  Планшеты
                  <input
                    type="radio"
                    name="category"
                    onChange={() => setCategoryFilter("tablets")}
                    checked={categoryFilter === "tablets"}
                  ></input>
                </label>
                <br></br>
                <label>
                  {" "}
                  Наушники
                  <input
                    type="radio"
                    name="category"
                    onChange={() => setCategoryFilter("headphones")}
                    checked={categoryFilter === "headphones"}
                  ></input>
                </label>
                <label>
                  {" "}
                  Прочее
                  <input
                    type="radio"
                    name="category"
                    onChange={() => setCategoryFilter("accessories")}
                    checked={categoryFilter === "accessories"}
                  ></input>
                </label>
                <div
                  onClick={() => {
                    setCategoryFilter("all");
                  }}
                  className="clearCategory"
                >
                  {" "}
                  Сбросить
                </div>
              </form>
            </div>
          )}
        </div>
        <div className="filter">
          <div
            onClick={() => {
              setShowBrendFilter(!showBrendFilter);
              setShowCategoryFilter(false);
              setShowPriceFilter(false);
            }}
            className="filtName"
          >
            Бренд {!showBrendFilter ? "▼" : "▲"}
          </div>
          {showBrendFilter && (
            <div className="brendFilter">
              <div className="brendsList">
                {brendsCollection.map((item) => (
                  <div>
                    {item}
                    <input
                  type="radio"
                  checked={brendFilter === item}
                  onChange={() => setBrendFilter(item)}
                ></input>
                    {/* <Radio
                      checked={brendFilter === item}
                      onChange={() => setBrendFilter(item)}
                      size="small"
                    /> */}
                  </div>
                ))}
              </div>
              <div
                onClick={() => setBrendFilter("all")}
                className="clearCategory"
              >
                Сбросить
              </div>
            </div>
          )}
        </div>
      </div>
      <Catalog
        request={request}
        priceValue={priceFilter}
        categoryValue={categoryFilter}
        brendValue={brendFilter}
      ></Catalog>
    </div>
  );
}

function valuetext(value) {
  return `${value}°C`;
}

const minDistance = 1;

export function MinimumDistanceSlider() {
  ////////////////////////////////
  const value1 = useSelector((state) => state.pricefilt.priceFilter);
  const dispatch = useDispatch();
  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      dispatch(
        setFilter([Math.min(newValue[0], value1[1] - minDistance), value1[1]])
      );
    } else {
      dispatch(
        setFilter([value1[0], Math.max(newValue[1], value1[0] + minDistance)])
      );
    }
    console.log("init" + value1);
  };

  return (
    <Box
      sx={{
        width: 320,
        backgroundColor: "rgb(253, 253, 253)",
        boxShadow: "2px 3px 6px #a79191",
        borderRadius: "5px",
        paddingLeft: "10px",
        paddingRight: "10px",
        position: "absolute",
        zIndex: "3",
        justifySelf: "center",
      }}
    >
      <Slider
        getAriaLabel={() => "Minimum distance"}
        value={value1}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
        min={1}
        max={5000}
        style={{ color: "rgb(138, 211, 230)" }}
      />
    </Box>
  );
}
