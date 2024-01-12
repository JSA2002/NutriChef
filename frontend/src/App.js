import './App.css';
import Landing from "./Component/Landing.js";
import Name from "./Component/Name.js"
import Camera from "./Component/Camera";
import Upload from "./Component/Upload";
import Ingredient from "./Component/Ingredient";
import Dishresult from './Component/Dishresult';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />}></Route>
        <Route path='/name' element={<Name />}></Route>
        <Route path='/name/:dishname' element={<Dishresult />} />
        <Route path='/name/:dishname' element={<Dishresult />} />
        <Route path='/ingredient/:dishname' element={<Dishresult />} />
        <Route path='/camera' element={<Camera />}></Route>
        <Route path='/upload' element={<Upload />}></Route>
        <Route path='/ingredient' element={<Ingredient />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
