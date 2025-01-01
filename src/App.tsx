import { BrowserRouter, Route, Routes } from "react-router-dom" 
import Categories from "./pages/Categories/Categories"
import Home from "./pages/Home/Home"

import './styles/App.css'

function App() {
 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/categories" element={<Categories/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
