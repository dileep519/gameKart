import React, { Component } from 'react';
import bcrypt from 'bcryptjs';
import './Signup.css';
import Axios from 'axios';
class Signup extends Component {
    state = { 
        name:"",
        email:"",
        password:"",
        confpassword:""
    }
    onSignup=async ()=>{
        if(this.state.password===this.state.confpassword){
        
        if(this.state.password==="" || this.state.name===""){
            if(this.state.password===""){
                this.props.onSignupDone("Password cannot be null");
            }
            if(this.state.name===""){
                this.props.onSignupDone("Name cannot be null")
            }
        }else{
            try{
                let password=this.state.password;
                let error="";
                password=await bcrypt.hash(password,10);
                Axios.post("https://games-server519.herokuapp.com/api/user/Signup",{
                    name:this.state.name,
                    email:this.state.email,
                    password:password
                }).then((res)=>{
                    error=res.data.error;
                    if(error){
                        this.props.onSignupDone(error);
                    }else{
                        this.setState({name:"",email:"",password:""});
                        this.props.onSignupDone();
                    }
                }).catch((err)=>{
                    console.log("error");
                })
            }catch(err){
                console.log(err);
            }
        } 
       }else{
           this.props.onSignupDone("Password and Confirm Password does not match")
       }
    }
    onConfpwdchange=(event)=>{
        this.setState({confpassword:event.target.value});
    }
    onEmailChange=(event)=>{
        this.setState({email:event.target.value});
    }
    onNameChange=(event)=>{
        this.setState({name:event.target.value});
    }
    onPasswordChange=(event)=>{
        this.setState({password:event.target.value});
    }
    render() { 
        let data=this.state;
        return (
            <div>
                <div>
                    <p className="register-text">Register</p>
                </div>
                <div>
                    <label className="name-input" htmlFor="user-name">Name</label><br/>
                    <input onChange={this.onNameChange} id="user-name" type="text" name="user-name" placeholder="Name" value={data.name}/>
                    <label  className="Email-text" htmlFor="email">Email</label><br/>
                    <input onChange={this.onEmailChange} id="email" type="email" name="email-id" placeholder="Email" value={data.email}/>
                    <label className="pwd-text" htmlFor="pwd">Password</label><br/>
                    <input onChange={this.onPasswordChange} id="pwd" type="password" name="password" placeholder="password" value={data.password}/><br/>
                    <label className="confpwd-text" htmlFor="confpwd">Confirm password</label><br/>
                    <input onChange={this.onConfpwdchange} id="confpwd" type="password" placeholder="confirm password" value={data.confpassword}/>
                    <button onClick={this.onSignup} className="signup-button" type="button">Register</button>
                </div>
            </div>
        );
    }
}
 
export default Signup;