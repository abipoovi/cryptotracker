import React, { useContext,useEffect,useState} from 'react'
import "./Home.css"
import {Coincontext} from "../../context/Coincontext.jsx"
import Footer from '../../component/Footer/Footer.jsx'
import { Link } from 'react-router-dom'

const Home = () => {

    const {allcoin,currency}=useContext(Coincontext)
    const [displaycoin,setDisplaycoin]=useState([]);
    const [input,setInput]=useState("");
    const inputhandler=(e)=>{
   setInput(e.target.value);
   if(e.target.value===""){
    setDisplaycoin(allcoin);
   }
    }
    useEffect(()=>{
        setDisplaycoin(allcoin);

    },[allcoin])
    const searchhandler=(event)=>{
        event.preventDefault();
       const data = allcoin.filter((coin)=>{
           return coin.name.toLowerCase().includes(input.toLowerCase())
        })
        setDisplaycoin(data);

    }

  return (
    <div className='Home'>
        <div className="hero">
            <h1>Largest <br/>Crypto Marketplace</h1>
            <p>Welcome to the world's largest cryptocurrency marketplace.<br/>Sign up to explore more about cryptos.</p>
        </div>
        <form className="searchform" onSubmit={searchhandler}>
            <input onChange={inputhandler} list="coinlist" value={input} type='text' placeholder='Search crypto' required/>
            <datalist id="coinlist">
                {allcoin.map((coin,index)=>{
                     return <option key={index} value={coin.name}/>})}
                </datalist>
            <button type='submit'>Search</button>
        </form>
        <div className="crypto-table">
            <div className="table-layout">
                <p>#</p>
                <p>Coins</p>
                <p>Price</p>
                <p>24H Change</p>
                <p className="marketcap">Market Cap</p>
            </div>
            {displaycoin.slice(0,10).map((coin,index)=>{
                return (
                    <Link to={`/coin/${coin.id}`} className="table-layout" key={index}>
                        <p>{index + 1}</p>
                        <div className="coin-img">
                            <img src={coin.image} alt={coin.name}/>
                        <p>{coin.name+"-"+coin.symbol}</p>
                        </div>
                        <p>{currency.symbol}{coin.current_price.toLocaleString()}</p>
                        <p className={coin.price_change_percentage_24h >= 0 ? "green" : "red"}>
                            {coin.price_change_percentage_24h.toFixed(2)}%
                        </p>
                        <p className="marketcap">{currency.symbol}{coin.market_cap.toLocaleString()}</p>
                    </Link>
                )
            })}
        </div>
    </div>
  )
}

export default Home