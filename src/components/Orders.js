import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { VerticalGraph } from "./VerticalGraph";
import TopBar from "./TopBar";
import { GeneralContextProvider } from "./GeneralContext";
import WatchList from "./WatchList";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3002/allOrders").then((res) => {
      // console.log(res.data);
      setAllOrders(res.data);
    });
  }, []);
  const labels = allOrders.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allOrders.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <>
<TopBar  />

<div className="dashboard-container"> 

<GeneralContextProvider>
<WatchList />
</GeneralContextProvider> 
<div className="content">

    <div className="orders">
      <div className="no-orders">
        {allOrders && allOrders.length > 0 ?
        <p>Order Hai bhai</p>:
        <p>You haven't placed any orders today</p>}

        <Link to={"/"} className="btn">
          Get started
        </Link>
      </div>
      <h3 className="title">Orders ({allOrders.length})</h3>

<div className="order-table">
  <table>
    <tr>
      <th>Instrument</th>
      <th>Qty.</th>
      <th>Avg. cost</th>
      <th>LTP</th>
      <th>Cur. val</th>
      {/* <th>P&L</th> */}
      {/* <th>Net chg.</th>
      <th>Day chg.</th> */}
    </tr>

    {allOrders.map((stock, index) => {
      const curValue = stock.price * stock.qty;
      const isProfit = curValue - stock.avg * stock.qty >= 0.0;
      const profClass = isProfit ? "profit" : "loss";
      const dayClass = stock.isLoss ? "loss" : "profit";

      return (
        <tr key={index}>
          <td>{stock.name}</td>
          <td>{stock.qty}</td>
          <td>{stock.avg?.toFixed(2)}</td>
          <td>{stock.price?.toFixed(2)}</td>
          <td>{curValue?.toFixed(2)}</td>
          {/* <td className={profClass}>
            {(curValue - stock.avg * stock.qty).toFixed(2)}
          </td>
          <td className={profClass}>{stock.net}</td>
          <td className={dayClass}>{stock.day}</td> */}
        </tr>
      );
    })}
  </table>
</div>


<VerticalGraph data={data} />
    </div>
    </div>
    </div>
    </>
  );
};

export default Orders;