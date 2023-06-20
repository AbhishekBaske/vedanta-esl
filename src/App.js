import { BrowserRouter as Router, Routes , Route } from "react-router-dom"
import Login from "./components/Login"
import SignUpForm from "./components/SignUp"
import Layout from "./pages/Layout"
import Post from "./components/Post"
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<SignUpForm />} />
          <Route path="/share" element ={<Layout><Post/></Layout>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App