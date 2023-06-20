import { useState } from "react"
import vedanta from "../assets/vedanta_esl.png"
import "./style/login.css"
import app from "../firebase"
import {getAuth} from "firebase/auth"
import {Link} from "react-router-dom"


function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await getAuth(app).signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      console.log(user)
    } catch (error) {
      console.log(error.message)
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
          placeholder="Email"
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
          placeholder="Password"
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
        <Link className="my-link" to="/register" >Register Here</Link>
    </div>
    </>
  )
}

export default Login