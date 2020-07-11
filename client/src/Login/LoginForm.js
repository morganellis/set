import React from "react";
import { Link } from "react-router-dom";

function LoginForm(props) {

  return (
    <div className="login-wrap form-wrap">
      <form className="container flex-cen" onSubmit={props.handleSubmit}>
        <p className="title">LOG IN</p>
        <input className="input" onChange={props.handleChange} value={props.email} name="email" type="email" placeholder="Email" />
        <input className="input" onChange={props.handleChange} value={props.password} name="password" type="password" placeholder="Password" />
        <button className="btn" disabled={!props.password} type="submit">Log In</button>
        <div className="sect">
          <p className="para">Don't have an account? </p>
          <p className="link"><Link to="/signup">Sign Up</Link></p>
        </div>
        {props.errMsg && <p className="err">{props.errMsg}</p>}
      </form>
    </div>
  )
};

export default LoginForm;