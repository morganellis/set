import React from "react";
import { Link } from "react-router-dom";

function SignupForm(props) {
    return (
        <div className="login-form-wrapper">
            <form className="login-form-container" onSubmit={props.handleSubmit}>
                <h3 className="login-head">Sign Up</h3>

                <input className="login-form-input" onChange={props.handleChange}
                    value={props.email}
                    name="email"
                    type="email"
                    placeholder="Email" />

                <input className="login-form-input" onChange={props.handleChange}
                    value={props.name}
                    name="name"
                    type="text"
                    placeholder="Name" />

                <input className="login-form-input" onChange={props.handleChange}
                    value={props.password}
                    name="password"
                    type="password"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?=.*\D).{6,}"
                    title="Must contain at least one number, one special character, one uppercase and one lowercase letter, and to be a min. length of 6 characters"
                    placeholder="Password" />

                <button className="login-butt" disabled={!props.name || !props.email || !props.password} type="submit">Create Account</button>

                <p className="no-account">Already have an account? </p>

                <p className="login-signup" >
                    <Link to="/login">Login</Link>
                </p>

                {props.errMsg && <p>{props.errMsg}</p>}

            </form>

        </div>
    )
}

export default SignupForm