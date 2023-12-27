import React, { Component } from 'react';
import './Buy.css';
import axios from 'axios';
import swal from 'sweetalert';

class Buy extends Component {
    state = {
        item:"",
        Name:"",
        Email:"",
        houseNo:"",
        street:"",
        area:"",
        city:"",
        pincode:"",
        Phone:"",
        id:"",
        token:""
     }
     static getDerivedStateFromProps(props,state){
         if(props.item.Rank!==state.item.Rank){
             state.item=props.item;
             state.token=props.token
         }
         return null;
     }
     onEmailChange=(event)=>{
         this.setState({Email:event.target.value});
     }
     onNameChange=(event)=>{
         this.setState({Name:event.target.value});
     }
     onPhoneChange=(event)=>{
         this.setState({Phone:event.target.value});
     }
     onHouseno=(event)=>{
         this.setState({houseNo:event.target.value});
     }
     onStreet=(event)=>{
         this.setState({street:event.target.value});
     }
     onArea=(event)=>{
         this.setState({area:event.target.value});
     }
     onCity=(event)=>{
         this.setState({city:event.target.value});
     }
     onPincode=(event)=>{
         this.setState({pincode:event.target.value});
     }
    onLastthing=()=>{
        axios.post("https://games-server519.herokuapp.com/api/user/userdetails","",{
            headers:{
                token:this.props.token
            }
        }).then((res)=>{
            if(res.data.id!==this.state.id){
                if(res.data.house){
                    this.setState({id:res.data.id,Name:res.data.Name,Email:res.data.Email,houseNo:res.data.Address.house,street:res.data.Address.street,area:res.data.Address.area,city:res.data.Address.city,pincode:res.data.Address.pincode})
                }else{
                    console.log("Resp-------",res.data.id);
                    console.log("State------",this.state.id);
                    this.setState({id:res.data.id,Name:res.data.Name,Email:res.data.Email})
                }
            }
        })
    }
    onCancelClick=()=>{
        this.props.onCanceled({buy:false,itemstobuy:[]})
    }
    onBuyClick=()=>{
        let type="";
        if(!this.state.Phone){
            type='Phone'
        }else if(!this.state.houseNo){
            type='House No'
        }else if(!this.state.street){
            type='Street'
        }else if(!this.state.area){
            type='Area'
        }else if(!this.state.city){
            type='City'
        }else if(!this.state.pincode){
            type='Pincode'
        }else if(!this.state.Email){
            type='Email'
        }else if(!this.state.Name){
            type='Name'
        }else{
            type="Done"
        }
        if(type==="Done"){
            axios.post("https://games-server519.herokuapp.com/api/user/addorder",this.state,{
                headers:{
                    token:this.props.token
                }
            }).then((res)=>{
                if(res.data.done===true){
                    swal({
                        title:'Success',
                        text:'Order Placed',
                        icon:'success',
                        dangerMode:false
                    })
                }else{
                    swal({
                        title:'Error',
                        text:'Please check your internet connection',
                        icon:'error',
                        dangerMode:true
                    })
                }
                this.props.onBuyDone(res.data);
            }).catch((err)=>{
                console.log(err);
            });
        }else{
            swal({
                title:type,
                text:'Please enter details',
                icon:'warning',
                dangerMode:true
            })
        }
    }
    render() { 
        return ( 
            <div className="buy-div">
                <div>{this.onLastthing()}</div>
                <div className="apply-flex">
                <div className="assign-margin">
                <div >
                    <div className="name-div-buy">
                        <label className="class-Name" htmlFor="Name">Name</label><br/>
                        <input id="Buy-Name" type="text" onChange={this.onNameChange} value={this.state.Name}/>
                    </div>
                    <div className="Buy-Email-div">
                    <label className="class-Email" htmlFor="Buy-Email">Email</label><br/>
                        <input id="Buy-Email" type="text" onChange={this.onEmailChange} value={this.state.Email}/>
                    </div>
                    </div>
                    <div>
                        <label className="class-phone" htmlFor="Phone">Phone number</label><br/>
                        <input id="Phone" type="number" onChange={this.onPhoneChange} value={this.state.Phone}/>
                    </div>
                    <div>
                        Address:
                        <div>
                            <label htmlFor="house-no">House No:</label><br/>
                            <input onChange={this.onHouseno} id="house-no" type="text" value={this.state.houseNo}/><br/>
                            <label htmlFor="street">Street</label><br/>
                            <input onChange={this.onStreet} id="street" type="text" value={this.state.street}/><br/>
                            <label htmlFor="area">Area</label><br/>
                            <input onChange={this.onArea} id="area" type="text" value={this.state.area}/><br/>
                            <label htmlFor="city">City</label><br/>
                            <input onChange={this.onCity} id="city" type="text" value={this.state.city}/><br/>
                            <label htmlFor="pincode">Pincode</label><br/>
                            <input onChange={this.onPincode} id="pincode" type="text" value={this.state.pincode}/><br/>
                        </div>
                    </div>
                    <div className="buy-buttons">
                        <button className="buy-button-cancle" onClick={this.onCancelClick} type="button">Cancel</button>
                        <button className="buy-button-buy" onClick={this.onBuyClick} type="button">Buy</button>
                    </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Buy;