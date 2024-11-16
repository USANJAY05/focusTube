import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Missing from "./pages/Missing";

export default function App() {
  return (
    <div className="text-3xl font-bold underline">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/video/:id' element={<Video />} />
          <Route path="*" element={<Missing />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}