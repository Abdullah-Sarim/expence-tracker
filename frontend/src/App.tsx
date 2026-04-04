  import { BrowserRouter, Routes, Route } from 'react-router-dom'
   import Mainlayout from './layout/Mainlayout'
   import Home from './pages/Home'
function App() {
 return(
<>
<BrowserRouter>
<Routes>
  <Route element={<Mainlayout></Mainlayout>}>
  <Route path='/' element={<Home></Home>}></Route>
  </Route>
</Routes>
</BrowserRouter>
</>
  )
}

export default App
