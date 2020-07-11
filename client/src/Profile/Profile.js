import React, { Component } from "react";
import axios from "axios";
import ProfileViewEdit from "./ProfileViewEdit.js";
import ProfilePassEdit from "./ProfilePassEdit.js";
import { connect } from "react-redux";
import { login, editUser } from "../redux/auth.js";
import "./profile.css";

const userAxios = axios.create();
userAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
})

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: {
        // name: props.name,
        // email: props.email,
        // password: "",
        // avatar: props.avatar
      },
      isEditing: false,
      isEditingPass: false,
      errMsgPass: "",
      msgSuccess: "",
      loading: false
    }
  }

  toggleIsEditing = (event) => {
    this.setState(prevState => {
      return {
        isEditing: !prevState.isEditing,
        msgSuccess: ""
      }
    });
  }
  toggleIsEditingPass = (event) => {
    this.setState(prevState => {
      return {
        isEditingPass: !prevState.isEditingPass,
        msgSuccess: ""
      }
    });
  }

  handleChange = (e) => {
    //too strict and general -> so no use of = e.persist();
    const { value, name } = e.target;
    this.setState(prevState => {
      return {
        inputs: {
          ...prevState.inputs,
          [name]: value
        }
      }
    });
  }

  clearInputs() {
    this.setState(prevState => {
      return {
        ...prevState,
        inputs: {
          // name: this.props.name,
          // email: this.props.email,
          // password: "",
          // avatar: this.props.avatar
        }
      }
    })
  }

  handleSubmit = (e) => {
    // e.preventDefault();
    this.props.editUser(this.props._id, this.state.inputs);
    this.clearInputs();
    this.setState(prevState => {
      return {
        ...prevState,
        loading: false,
        msgSuccess: "Profile Updated Successfully"
      }
    });
    // this.toggleIsEditing();
  }
  handleSubmitPass = (e) => {
    e.preventDefault();
    this.setState(prevState => {
      return {
        ...prevState,
        loading: true
      }
    });
    userAxios.post(`/api/users/change-password`, { password: this.state.inputs.password })
      .then(response => {
        this.setState(prevState => {
          return {
            ...prevState,
            loading: false,
            msgSuccess: "Password Changed Successfully"
          }
        });
      })
      // .catch(err => { });
      .catch(err => {
        this.setState(prevState => {
          return {
            ...prevState,
            errMsgPass: err.message
          }
        })
      })
    this.clearInputs();
    // this.toggleIsEditingPass();
  }
  handleDeleteUser = (e) => {
    // e.preventDefault();
    userAxios.delete(`/api/users/delete-user`)
      .then(response => { })
      .catch(err => { });
  }

  render() {
    const { isEditing, isEditingPass, errMsgPass, loading, msgSuccess } = this.state;
    const authErrorCode = this.props.authErrCode;
    let errMsg = '';
    if (authErrorCode < 500 && authErrorCode > 399) {
      errMsg = "Email already in use. Please sign up with a new email, or log in with your existing one."
    } else if (authErrorCode > 499) {
      errMsg = "Server error!"
    }
    // console.log(this.props);
    if (isEditing) {
      return (
        <div className="login-form-wrapper">
          <ProfileViewEdit
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            errMsg={errMsg}
            msgSuccess={msgSuccess}
            toggleIsEditing={this.toggleIsEditing}
            handleDeleteUser={this.handleDeleteUser}
            {...this.state} />
        </div>
      )
    } else if (isEditingPass) {
      return (
        <div className="login-form-wrapper">
          <ProfilePassEdit
            handleChange={this.handleChange}
            handleSubmitPass={this.handleSubmitPass}
            loading={loading}
            errMsgPass={errMsgPass}
            msgSuccess={msgSuccess}
            toggleIsEditingPass={this.toggleIsEditingPass}
            passEdit={this.state.inputs.password} />
        </div>
      )
    } else {
      return (
        <div className="login-form-wrapper">
          <div className="login-form-container">
            <h3 className="login-head">Profile</h3>
            {!this.props.avatar ? "" : <img className="avatar" src={this.props.avatar} alt="Profile" />}
            <h4 className="login-form-input" style={{ textTransform: "capitalize" }} >Name: {this.props.name}</h4>
            <h4 className="login-form-input">Email: {this.props.email}</h4>
            <h4 className="login-form-input">Best Score: {this.props.bestScore}</h4>
            <div className="buttProfile">
              <button className="login-butt" onClick={this.toggleIsEditing}>Edit Profile</button>
              <button className="login-butt" onClick={this.toggleIsEditingPass}>{"Edit Pass-\nword"}</button>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default connect(state => state.user, { login, editUser })(Profile);
