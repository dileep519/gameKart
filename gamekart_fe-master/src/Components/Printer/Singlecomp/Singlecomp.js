import React, { Component } from 'react';
import axios from "axios";
import './Singlecomp.css';

class Singlecomp extends Component {
    state = {
        Rank:"",
        Name:"",
        Platform:"",
        Year:"",
        Genre:"",
        Publisher:"",
        Global_Sales:"",
        Price:"",
        token:"",
        Added:""
    }
    static getDerivedStateFromProps(props,state){
        if(state.Rank!==props.value.Rank){
            state.Rank=props.value.Rank;
            state.Name=props.value.Name;
            state.Platform=props.value.Platform;
            state.Year=props.value.Year;
            state.Genre=props.value.Genre;
            state.Publisher=props.value.Publisher;
            state.Global_Sales=props.value.Global_Sales;
            state.Price=props.value.Price;
            state.token=props.token;
        }
        return null;
    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps.value.Rank!==prevState.Rank){
            axios.post("https://games-server519.herokuapp.com/api/user/find",this.state,{
                headers:{
                    token:this.state.token
                }
            }).then((res)=>{
                this.setState({Added:res.data.Added});
            })
        }
    }
    componentDidMount(){
        axios.post("https://games-server519.herokuapp.com/api/user/find",this.state,{
            headers:{
                token:this.state.token
            }
        }).then((res)=>{
            this.setState({Added:res.data.Added});
        })
    }
    addToCart=()=>{
         axios.post("https://games-server519.herokuapp.com/api/user/cart",this.state,{
             headers:{
                 token:this.state.token
             }
         }).then((res)=>{
             if(!res.data.error){
                 if(!res.data.count){

                 }else{
                    this.setState({Added:true});
                    this.props.onAddedtocart(res.data.count);
                 }
             }
         })
    }
    onClickedBuy=()=>{
        this.props.onBuyItem({buy:true,itemtobuy:this.state});
    }
    render() { 
        let data=this.state;
        return ( 
            <div className="single-box">
                <div className="sub-single-box">
                <div className="handle-text">
                    Rank:{data.Rank}
                </div>
                <div className="handle-text-name">
                    Name:{data.Name}
                </div>
                <div className="handle-text">
                    Platform:{data.Platform}
                </div>
                <div className="handle-text">
                    Year:{data.Year}
                </div>
                <div className="handle-text">
                    Genre:{data.Genre}
                </div>
                <div className="handle-text-publisher">
                    Publisher:{data.Publisher}
                </div>
                <div className="handle-text">
                    Global_Sales:{data.Global_Sales}
                </div>
                <div className="handle-text">
                    Price:${data.Price}
                </div>
                </div>
                <div className="final-single-div">
        <button className="cart-button-single" onClick={this.addToCart}>{this.state.Added===true?"Added to cart":"Add to cart"}</button>
                    <button className="buy-button-single" onClick={this.onClickedBuy}>Buy</button>
                </div>
            </div>
         );
    }
}
 
export default Singlecomp;