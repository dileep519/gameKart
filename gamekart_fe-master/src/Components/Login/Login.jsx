import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';
class Login extends Component {
    state = {
        email:"",
        password:""
    }
    onEmailchange=(event)=>{
        this.setState({email:event.target.value});
    }
    onPasswordchange=(event)=>{
        this.setState({password:event.target.value});
    }
    onLogin=()=>{
        if(this.state.email==="" || this.state.password===""){
            if(this.state.email===""){
                this.props.onLoginDone({error:"Email cannot be null"})
            }
            if(this.state.password===""){
                this.props.onLoginDone({error:"Password cannot be null"})
            }
        }else{
            axios.post("https://games-server519.herokuapp.com/api/user/Login",this.state).then((res)=>{
                if(res.data.error){
                    this.props.onLoginDone({error:res.data.error});
                }else{
                    this.props.onLoginDone({error:"",token:res.data.token});
                }
            }).catch((err)=>{
                console.log(err);
            })
        }
    }
    render() { 
        return ( 
            <div>
                <div>
                    <p className="login-text">Login</p>
                </div>
                <div>
                    <label className="Email-text" htmlFor="Email">Email </label><br/>
                    <input onChange={this.onEmailchange} id="Email" type="email" placeholder="Email" value={this.state.email}/><br/>
                    <label  className="pwd-text" htmlFor="password">Password</label><br/>
                    <input onChange={this.onPasswordchange} id="password" type="password" placeholder="password" value={this.state.password}/><br/>
                </div>
                <footer>
                    <button onClick={this.onLogin} className="login-but" type="button">Login</button>
                </footer>
            </div>
         );
    }
}
 
export default Login;