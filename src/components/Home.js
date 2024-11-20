import React from 'react';
import Dashboard from './Dashboard';
import TopBar from './TopBar';


import {useLocation, useNavigate} from 'react-router-dom';
import Summary from './Summary';
import { GeneralContextProvider } from './GeneralContext';
import WatchList from './WatchList';

function Home (){
    const location=useLocation()

    return (
        // <div className="homepage">

        //     <h1>Hello {location.state.id} and welcome to the home</h1>

        // </div>
        <>
         <TopBar  />

<div className="dashboard-container"> 
  
 <GeneralContextProvider>
  <WatchList />
</GeneralContextProvider> 
<div className="content">
        <Summary />
        </div>
        </div>
        </>
    )
}

export default Home
