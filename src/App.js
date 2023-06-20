import { BrowserRouter as Router, Routes , Route } from "react-router-dom"
import Login from "./components/Login"
function App() {
  return (
    <div>
      <Router>
        <Login />
      </Router>
    </div>
  )
}

export default App