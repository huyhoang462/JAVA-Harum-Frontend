import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./app/pages/Home/Home"
import DefaultLayout from "./app/layouts/DefaultLayout"
import Profile from "./app/pages/Profile/Profile"
import NotFound from "./app/pages/NotFound/NotFound"

function App() {

  return (
    <>
      <BrowserRouter >
      <Routes>
        <Route path="*" element={<NotFound/>}/>
        <Route element={<DefaultLayout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/profile" element={<Profile/>}/>
        
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
