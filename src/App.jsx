import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Missing from "./pages/Missing";
import NavBar from "./components/navBar/NavBar";
import Common from "./pages/Common";

export default function App() {
  return (
    <div className="text-lg h-[100vh] flex flex-col">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/video/:id' element={<Video />} />
          <Route path="/:id" element={<Common />} />
          <Route path="*" element={<Missing />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}