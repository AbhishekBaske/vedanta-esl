import { useState } from "react"
import vedanta from "../assets/vedanta_esl.png"
import "./style/login.css"
import { useNavigate } from "react-router-dom"
import { auth } from "../firebase"
function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      console.log(user)
    } catch (error) {
      // Handle errors
    }
  }
  return(
    <>
    <div className="container">
      <div className="container__logo">
        <img className="container__logo--vedanta" src={vedanta}  alt="" />
      </div>
      <h1 className="container__header">Knowledge Sharing Portal</h1>
      <div className="container__forms">
        <h2 className="container__forms--header">Sign In with your registerd email id</h2>
        <form className="container__forms--form" onSubmit={handleSignIn}>
          <input className="container__forms--input"
          type="email"
          name="email"
          placeholder="email"
          value = {email}
          onChange={
            (e)=>{
              setEmail(e.target.value)
            }
          }
          />
          <input className="container__forms--input"
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e)=>{
            setPassword(e.target.value)
          }}
          />
          <div><button className="container__forms--button"
          type="submit"
          >Sign In</button></div>
          <div></div>
        </form>
      </div>
    </div>
    </>
  )
}

export default Login