import { HashRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"

const Router = () => {
return(
  <HashRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      {/* <Route path="/search" element={<Search />}/> */}
      {/* <Route/> */}
    </Routes>
  </HashRouter>
)
}

export default Router
