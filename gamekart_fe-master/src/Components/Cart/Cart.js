import React, { Component } from 'react';
import axios from 'axios';
import { RiShoppingCart2Line } from "react-icons/ri";
import "./Cart.css";

class Cart extends Component {
    state = { 
        value:""
     }
     static getDerivedStateFromProps(props,state){
         if(props.cart_count!==state.value){
            state.value=props.cart_count;
         }
         return null;
     }
     onCartclickednow=()=>{
         axios.post(`https://games-server519.herokuapp.com/api/user/findcart`,"",{
             headers:{
                 token:this.props.token
             }
         }).then((res)=>{
             this.props.onCartItems(res);
         }).catch((err)=>{
             console.log(err);
         })
     }
    render() { 
        return ( 
            <div>
                <button className="cart-button" onClick={this.onCartclickednow} type="button">
                    <RiShoppingCart2Line className="test-div" color="black" size="2em" />
                </button>
        <div className="cart-icon" style={{display:this.state.value===0?"none":"block"}}>{this.state.value}</div>
            </div>
         );
    }
}
 
export default Cart;