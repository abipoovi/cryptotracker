import React,{useContext} from 'react'
import "./Navbar.css"
import logo from "../../../public/logo.png"
import {Coincontext} from "../../context/Coincontext.jsx"
import {Link} from 'react-router-dom'

const Navbar = () => {
    const {setCurrency} = useContext(Coincontext)
    const currencyHandler=(e)=>{
        switch(e.target.value){
            case "usd":
                {
                    setCurrency({
                        name:"usd",
                        symbol:"$"
                    })
                    break;
                }
            case "inr":
                {
                    setCurrency({
                        name:"inr",
                        symbol:"₹"
                    })
                    break;
                }
            case "eur":
                {
                    setCurrency({
                        name:"eur",
                        symbol:"€"
                    })
                    break;
                }
                default:
                    {
                        setCurrency({
                            name:"usd",
                            symbol:"$"
                        })
                        break;
                    }
        }
    }
  return (
    <div className='navbar'>
        <Link to={'/'} className="logo">
             <img src={logo} alt=""/>
             <h2>CryptoTracker</h2>
        </Link>
       
        <ul className='nav-left'>
            <Link to={'/'}><li>Home</li></Link>
            <li>Features</li>
            <li>Pricing</li>
            <li>Blog</li>
        </ul>
        <div className="nav-right">
            <select onChange={currencyHandler}>
                <option value="usd">USD</option>
                <option value="inr">INR</option>
                <option value="eur">EUR</option>
            </select>
            <button>Sign Up</button>
        </div>
    </div>

  )
}

export default Navbar