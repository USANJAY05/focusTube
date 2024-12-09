import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Missing from "./pages/Missing";
import NavBar from "./components/navBar/NavBar";
import Channel from "./pages/Channel";
import SideBar from "./components/sideBar/SideBar";
import SearchResult from "./pages/SearchResult";
import Shots from "./pages/Shots";

export default function App() {
  return (
    <div className="text-lg h-[100vh] flex flex-col">
      <BrowserRouter>
        <NavBar />
        <div className="flex overflow-auto h-full">
          <SideBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/shots/:id' element={<Shots />} />
            <Route path="/:sidebar" element={<Home />} />
            <Route path='/video/:id' element={<Video />} />
            <Route path="/channel/:channelId" element={<Channel />} />
            <Route path="/search/:query" element={<SearchResult />} />
            <Route path="*" element={<Missing />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}