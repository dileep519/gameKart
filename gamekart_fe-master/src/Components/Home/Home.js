import React, { Component } from 'react';
import axios from 'axios';
import "./Home.css"
class Home extends Component {
    onClicked=()=>{
            axios.post(`https://games-server519.herokuapp.com/api/user/games?page=${this.props.page}`,"",{
                headers:{
                    token:`${this.props.token}`
                }
            }).then((res)=>{
                this.props.onHomeclicked({data:res.data});
            }).catch((err)=>{
                console.log(err);
            })
        }
    render() { 
        return ( 
            <div>
                <button className="home-but" onClick={this.onClicked}>Home</button>
            </div>
         );
    }
}
 
export default Home;