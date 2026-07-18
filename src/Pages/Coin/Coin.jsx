import React, { useContext, useEffect, useState } from 'react'
import "./Coin.css"
import { useParams } from 'react-router-dom'
import { Coincontext } from '../../context/Coincontext';
import Coinchart from '../../component/Coinchart/coinchart';

const Coin = () => {
  const {currency}=useContext(Coincontext);
  const {coinid}=useParams();
  const [coindata,setCoindata]=useState();
  const[historicaldata,setHistoricaldata]=useState();
  const fetchdata=async()=>{
      try {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinid}`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'x-cg-demo-api-key': 'CG-DLhfXmXh2o8R6Rz7baDj5yBt'
      }
    });
    const data = await response.json();
    console.log(data)
    setCoindata(data);
  } catch (error) {
    console.error('Error:', error);
  }
  }
  const fetchhistoricaldata=async()=>{

  const url = `https://api.coingecko.com/api/v3/coins/${coinid}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`;
  
  const options = {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'x-cg-demo-api-key': 'CG-DLhfXmXh2o8R6Rz7baDj5yBt'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    setHistoricaldata(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}


  useEffect(()=>{
    fetchdata();
    fetchhistoricaldata()
  },[currency, coinid])
  if(coindata && historicaldata){
  return (
    <div className='Coin'>
      <div className="coin-name">
        <img src={coindata.image.large} alt="" />
        <p>{coindata.name} ({coindata.symbol.toUpperCase()})</p>
      </div>
      <div className="coin-chart">
        <Coinchart historicaldata={historicaldata}/>
      </div> 
      <div className="coin-info">
        <ul>
          <li>Crypto Market Rank</li>
          <li>{coindata.market_cap_rank}</li>
        </ul>
        <ul>
          <li>Current Price</li>
          <li>{currency.symbol}{coindata.market_data.current_price[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>Market Cap</li>
          <li>{currency.symbol}{coindata.market_data.market_cap[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>24H High</li>
          <li>{currency.symbol}{coindata.market_data.high_24h[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>24H Low</li>
          <li>{currency.symbol}{coindata.market_data.low_24h[currency.name].toLocaleString()}</li>
        </ul>
      </div>
      
    </div>
  )
}
else{
  return(
    <div className="Spinner">
      <div className="spin"></div>
    </div>
  )
}
}


export default Coin