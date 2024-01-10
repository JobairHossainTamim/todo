
import Home from "./pages/Home";

import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route exact path='/' element={<><Home /></>}></Route>
          <Route exact path='/home' element={<><Home /></>}></Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
