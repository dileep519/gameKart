import React, { Component } from 'react';
import axios from 'axios';
class ApplyFilter extends Component {
    applyfilterondata=()=>{
        axios.post("https://games-server519.herokuapp.com/api/user/games")
    }
    render() { 
        return ( 
            <div>
                {this.applyfilterondata()}
            </div>
         );
    }
}
 
export default ApplyFilter;