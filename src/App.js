import { BrowserRouter as Router, Routes , Route } from "react-router-dom"
import Login from "./components/Login"
import SignUpForm from "./components/SignUp"
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element = {<SignUpForm />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App