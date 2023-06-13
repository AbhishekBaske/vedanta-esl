import { useState } from "react"
import vedanta from "./assets/vedanta_esl.png"
import "./App.css"

function App(){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault()
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
        <form className="container__forms--form" onSubmit={handleSubmit}>
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
        </form>
      </div>
    </div>
    </>
  )
}

export default App