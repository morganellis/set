import React from "react";
import { Link } from "react-router-dom";

function SignupForm(props) {
  return (
    <div className="signup-wrap form-wrap">
      <form className="container" onSubmit={props.handleSubmit}>
        <p className="title">SIGN UP</p>
        <input className="input" onChange={props.handleChange} value={props.email} name="email" type="email" placeholder="Email" />
        <input className="input" onChange={props.handleChange} value={props.name} name="name" type="text" placeholder="Name" />
        <input className="input" onChange={props.handleChange} value={props.password} name="password" type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?=.*\D).{6,}" title="Must contain at least one number, one special character, one uppercase and one lowercase letter, and to be a min. length of 6 characters" placeholder="Password" />
        <button className="btn" disabled={!props.name || !props.email || !props.password} type="submit">Create Account</button>
        <div className="sect">
          <p className="para">Already have an account? </p>
          <p className="link"><Link to="/signup">Log in</Link></p>
        </div>

        {props.errMsg && <p>{props.errMsg}</p>}

      </form>

    </div>
  )
}

export default SignupForm