import React from "react";
import { connect } from "react-redux";

function ProfileViewEdit(props) {
    if (props.msgSuccess) {
        setTimeout(props.toggleIsEditing, 2000);
        return (
            <div className="login-form-wrapper">
                <form className="login-form-container">
                    <h3 className="login-head">{props.msgSuccess}</h3>
                </form>
            </div>
        )
    };
    return (
            <form className="login-form-container" onSubmit={props.handleSubmit}>
                <h3 className="login-head">Profile</h3>
                <input className="login-form-input" onChange={props.handleChange}
                    value={props.inputs.name}
                    name="name"
                    type="text"
                    placeholder="Change Name" />

                <input className="login-form-input" onChange={props.handleChange}
                    value={props.inputs.email}
                    name="email"
                    type="email"
                    placeholder="Change Email" />
                <input className="login-form-input" onChange={props.handleChange}
                    value={props.inputs.avatar}
                    name="avatar"
                    type="url"
                    placeholder="Change Avatar" />
            
                    <button className="login-butt" onClick={props.toggleIsEditing}>Back to Profile</button>
                    <button disabled={!props.inputs.name && !props.inputs.email && !props.inputs.avatar} className="login-butt" type="submit">Save Changes</button>
                    <button style={{backgroundColor: "darkred", position: "absolute", transform: "translateX(-50%) translateY(-50%)", bottom: "10%", left: "50%" }} className="login-butt" onClick={props.handleDeleteUser}>DELETE Profile</button>
                

                {props.errMsg && <p>{props.errMsg}</p>}

            </form>

    )
}

export default connect(state => state.user, {})(ProfileViewEdit);