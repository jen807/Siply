import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import Detail from "./pages/Detail/Detail";

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </HashRouter>
  );
};

export default Router;
