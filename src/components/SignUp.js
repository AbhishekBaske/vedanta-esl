import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../firebase';
import style from "./style/Signup.module.css"
import vedanta from "../assets/vedanta_esl.png"

const SignUpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user's display name
      await updateProfile(user, { displayName: name });
      console.log("signedup successfully")
      // User signed up successfully
    } catch (error) {
      // Handle errors
        console.log(error.message)
    }
  };

  return (
    <div className={style.layout}>
      <img className={style.logoVedanta } src={vedanta} alt=""/>
      <form className={style.form } onSubmit={handleSignUp}>
      <input className={style.input}
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className={style.input}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className={style.input}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
        <button className={style.button } type="submit">Sign Up</button>
      </form>
      </div>
  );
};

export default SignUpForm;
