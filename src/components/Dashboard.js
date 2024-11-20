import React from "react";
import { BrowserRouter, Route, Routes, useSearchParams } from "react-router-dom";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";

import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import Menu from "./Menu";
import { GeneralContextProvider } from "./GeneralContext";
import Signup from "./Signup";
import Home from "./Home";
import TopBar from "./TopBar";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
console.log({searchParams})
  return (
    <>
     
   
        
      <Routes>
        <Route path="/" element={<Signup />} />
        {/* <Route exact path="/summary" element={<Summary />} /> */}
        <Route path="/home" element={<Home />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/holdings" element={<Holdings />} />
        <Route path="/positions" element={<Positions />} />
        <Route path="/funds" element={<Funds />} />
        <Route path="/apps" element={<Apps />} />
      </Routes>
     

      </>
  );
};

export default Dashboard;