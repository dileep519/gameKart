import React, { Component } from 'react';
import axios  from 'axios';
import './Profile.css';
class Profile extends Component {
    state={
        token:""
    }
    UNSAFE_componentWillMount(){
        this.setState({token:this.props.token});
    }
    onLogout=()=>{
        this.props.onDone();
    }
    onOrder=()=>{
        axios.post("https://games-server519.herokuapp.com/api/user/orders","",{
            headers:{
                token:this.state.token
            }
        }).then((res)=>{
            this.props.onOrders(res);
        })
    }
    render() { 
        return ( 
            <div className="profile-dropdown">
                <button className="profile-dropbtn">Profile</button>
                <div className="profile-dropdown-content">
                    <button className="profile-orders" onClick={this.onOrder}>Orders</button>
                    <button className="profile-logout" onClick={this.onLogout}>Logout</button>
                </div>
            </div>
         );
    }
}
 
export default Profile;