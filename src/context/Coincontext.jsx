import{ createContext, useState, useEffect } from "react";

export const Coincontext=createContext();
const CoincontextProvider=(props)=>{

    const [allcoin,setAllcoin]=useState([]);
    const [currency,setCurrency]=useState({
        name:"usd",
        symbol:"$"
    })
    const fetchAllcoin=async()=>{
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`

fetch(url, {
  method: 'GET',
  headers: {
    'accept': 'application/json',
    'x-cg-demo-api-key': 'CG-DLhfXmXh2o8R6Rz7baDj5yBt'
  }
})
  .then(response => response.json())
  .then(data => {
    setAllcoin(data);
    console.log(data);
  })
  .catch(error => console.error('Error:', error));
    }
    useEffect(()=>{
        fetchAllcoin();
    },[currency])
    const contextvalue={
allcoin,currency,setCurrency
    }
    return (
        <Coincontext.Provider value={contextvalue}>
            {
                props.children
            }
        </Coincontext.Provider>
    )
}
export default CoincontextProvider;