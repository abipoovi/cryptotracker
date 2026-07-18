
import './App.css'
import Navbar from './component/Navbar/Navbar'
import {Route,Routes} from "react-router-dom"
import Home from './Pages/Home/Home'
import Coin from './Pages/Coin/Coin'
import Footer from './component/Footer/Footer'


function App() {
 

  return (
  
 <div className='app'>
  <Navbar/>
  <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/coin/:coinid" element={<Coin/>}></Route>
  </Routes>
  <Footer/>
 </div>
  )
}

export default App
