import React, { Component } from 'react';
import "./Printer.css";
import Singlecomp from './Singlecomp/Singlecomp';
class Printer extends Component {
    state={
        data:[],
        token:""
    }
    onCartData=(event)=>{
        this.props.onCartCount(event);
    }
    onBuyItemFromChild=(event)=>{
        this.props.onBuyItemGame(event);
    }
    onPrint=()=>{
        if(this.state.data){
            return this.state.data.map((e,i)=>{
                return <Singlecomp onBuyItem={this.onBuyItemFromChild} onAddedtocart={this.onCartData} key={i} token={this.state.token} value={e}/>
            })
        }
    }
    static getDerivedStateFromProps(props, state){
        if(state.data!==props.data){
            state.data=props.data;
            state.token=props.token;
        }
        return null;
    }
    render() { 
        return ( 
            <div className="printer-div-css">
                {this.onPrint()}
            </div>
         );
    }
}
 
export default Printer;