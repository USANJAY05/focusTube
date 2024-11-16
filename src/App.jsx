import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Missing from "./pages/Missing";
import NavBar from "./components/navBar/NavBar";

export default function App() {
  return (
    <div className="text-lg">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/video/:id' element={<Video />} />
          <Route path="*" element={<Missing />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}