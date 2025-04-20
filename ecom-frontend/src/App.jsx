import {BrowserRouter as  Router, Routes ,Route } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import Home from "./components/Home"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path ="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </Router>
  
   
   
  )
}

export default App
