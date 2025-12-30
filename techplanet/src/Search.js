import { useState, useEffect, useRef } from "react";
import * as React from 'react';
import Filters from "./Filters";
import "./Search.css";

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';


let text="";

function Search() {

  const [filter, setFilter] = useState(""); //состояние запроса в строке поиска
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const request=(evt, promise)=>{
    evt.preventDefault();
    // console.log(promise)
    setFilter(promise);
  }


  return (
    <div>
      <div className="searchContainer">
        <div className="forinput">
        <Paper
        variant="outlined"
        square={false}
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center',
        width:windowWidth <670? "55vw": "35vw", backgroundColor: "rgb(194, 194, 194)",
        borderRadius: 10,  height: "55%"}}
        onSubmit={(e) => request(e, text)}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Искать"
          //inputProps={{ 'aria-label': 'search google maps' }}
          onChange={(e)=>{text=e.target.value}}
        />
        <IconButton type="button" sx={{ p: '10px'}} aria-label="search" onClick={(e)=>request(e, text)}>
          <SearchIcon/>
        </IconButton>
      </Paper>
        </div>
      </div>
      <Filters request={filter}></Filters >
    </div>
  );
}

export { Search };
  
