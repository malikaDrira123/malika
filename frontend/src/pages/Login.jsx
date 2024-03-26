import React, { useState } from "react";
import "./CSS/loginsignup.css";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [err, setErr] = useState();
  const auth = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    setErr();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputs.email.trim() === "" || inputs.password.trim() === "") {
      return setErr("Veuillez remplir tous les champs");
    }
    axios
      .post("http://localhost:9000/login", inputs)
      .then((res) => {
        //C'est pour gérè l'etat si l'utilisateur se trompe de mot de passe
        // il ne stock pas la res.data

        if (res.data.token) {
          auth.login(res.data);
         
          navigate("/");
        }
      })
      .catch((res) => setErr(res.data));
  };
  return (
    <form method="post" onSubmit={handleSubmit}>
    <main className="login-Signup">
       
      <section className="login-container">
        <h1> SingIn</h1>
        <section className="login-signup-fields">
          
            <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            value={inputs.email}
            placeholder="azerty@azerty.fr"
          />
       <label htmlFor="password">password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          value={inputs.password}
          placeholder="Mot de passe"
        />
        </section>

        
        <button>Se connecter</button>
        {
        err && <span>{err}</span>
        }
  
  
      </section>
     
    </main>
    </form>
  );
};

export default Login
