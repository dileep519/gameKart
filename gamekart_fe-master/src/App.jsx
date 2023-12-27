import React, { Component } from 'react';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Search from './Components/Search/Search';
import Home from './Components/Home/Home';
import Cart from './Components/Cart/Cart';
import Profile from './Components/Profile/Profile';
import Sort from './Components/Sort/Sort'; 
import Filter from './Components/Filter/Filter';
import Printer from './Components/Printer/Printer';
import SortingData from './Components/SortingData/SortingData';
import Buy from './Components/Buy/Buy';
// import ApplyFilter from './Components/ApplyFilter/ApplyFilter';
import swal from 'sweetalert';
import './App.css';
import axios from 'axios';
class App extends Component {
    state = { 
        log:true,
        token:"",
        data:[],
        total:"",
        total_rec:"",
        page:1,
        cart_count:0,
        search:"",
        sort:"",
        filters:[],
        filteractive:"",
        display:true,
        buy:false,
        itemtobuy:"",
        from:""
     }
    onLoginclicked=()=>{
        this.setState({log:true});
    }
    onSignupclicked=()=>{
        this.setState({log:false});
    }
    onSignup=(event)=>{
        if(event){
            swal({
                title:"Error",
                text:event,
                icon:"error",
                dangerMode:false
            });
        }else{
            swal({
                title:"Signup Done",
                text:"Successfull",
                icon:"success"
            })
            this.setState({log:true});
        }
    }
    onLogin=(event)=>{
        if(event.error){
            swal({
                title:"Error",
                text:event.error,
                icon:"error",
                dangerMode:true
            })
        }else{
            this.setState({token:event.token});
        }
    } 

    onDataReceiveFromSearch=(event)=>{
        if(event.data.error){
            swal({
                title:"Error",
                text:"Please check your internet connection",
                icon:"error",
                dangerMode:true
            })
        }else{
            if(event.data.data.length===0){
                swal({
                    title:"No results found",
                    text:"Try different keywords",
                    icon:"warning",
                    dangerMode:true
                })
            }else{
                axios.post("https://games-server519.herokuapp.com/api/user/games/count","",{
                    headers:{
                        token:this.state.token
                    }
                }).then((res)=>{
                    let filters,display;
                    if(event.data.search===""){
                        filters=[];
                        display=false;
                    }else{
                        filters=event.data.filters;
                        display=true;
                    }
                    this.setState({data:event.data.data,page:event.data.page,total:event.data.total_pages,total_rec:event.data.total_rec,search:event.data.search,cart_count:res.data.count,sort:"",filters,display,buy:false,from:'Search'});
                }).catch((err)=>{
                    console.log(err);
                })
            }
        }
    }
    onDataReceiveFromHome=(event)=>{
        if(event.data.error){
            swal({
                title:"Error",
                text:"Please check your internet connection",
                icon:"error",
                dangerMode:true
            })
        }else{
            if(event.data.data.length===0){
                swal({
                    title:"Result found 0",
                    text:"Search text does not found",
                    icon:"error",
                    dangerMode:true
                })
            }else{
                axios.post("https://games-server519.herokuapp.com/api/user/games/count","",{
                    headers:{
                        token:this.state.token
                    }
                }).then((res)=>{
                    this.setState({data:event.data.data,page:event.data.page,total:event.data.total_pages,total_rec:event.data.total_rec,search:event.data.search,cart_count:res.data.count,sort:"",filters:[],filteractive:"",display:false,buy:false,from:"Home"});
                }).catch((err)=>{
                    console.log(err);
                })
            }
        }
    }
    onCartCountReceived=(event)=>{
        this.setState({cart_count:event});
    }
    onCartItemsReceived=(event)=>{
        this.setState({data:event.data.data,page:event.data.page,total:event.data.total_pages,
        total_rec:event.data.total_rec,search:event.data.search,sort:"",filters:[],filteractive:"",display:false,buy:false,from:"Cart"});
    }
    onSetValue=(sort)=>{
        this.setState({sort});
    }
    onSortDataReceived=(event)=>{
        if(event.data.error){
            swal({
                title:"Error",
                text:"Please check your internet connection",
                icon:"error",
                dangerMode:true
            })
        }else{
            if(event.data.data.length===0){
                swal({
                    title:"Result found 0",
                    text:"Search text does not found",
                    icon:"error",
                    dangerMode:true
                })
            }else{
                axios.post("https://games-server519.herokuapp.com/api/user/games/count","",{
                    headers:{
                        token:this.state.token
                    }
                }).then((res)=>{
                    let flag=0;
                    for(let i=0;i<event.data.data.length;i++){
                        if(event.data.data[i].Rank!==this.state.data[i].Rank){
                            flag=1;
                            break;
                        }
                    }
                    if(flag===1){
                        this.setState({data:event.data.data,page:event.data.page,total:event.data.total_pages,total_rec:event.data.total_rec,search:event.data.search,sort:this.state.sort,cart_count:res.data.count,filters:event.data.filters,filteractive:this.state.filteractive,display:true,buy:false,from:"Sort"});
                    }
                }).catch((err)=>{
                    console.log(err);
                })
            }
        }
    }
    onLoggedout=()=>{
        this.setState({log:true,data:[],token:"",total:"",total_rec:"",total_pages:"",page:1,cart_count:"",search:"",sort:"",filters:[],filteractive:"",display:false,buy:false,from:""});
    }
    onFilterValue=(value)=>{
        this.setState({filteractive:value});
    }
    onBuyGame=(event)=>{
        this.setState({buy:true,itemtobuy:event.itemtobuy,display:false});
    }
    onCancel=(event)=>{
        this.setState({buy:false,itemtobuy:[],display:true})
    }
    onbuyreset=(event)=>{
        if(this.state.display===false){
            this.setState({buy:false,itemtobuy:[],cart_count:event.cart_count,data:this.state.data,display:false})
        }else{
            
            this.setState({buy:false,itemtobuy:[],cart_count:event.cart_count,data:event.data.data,display:false})
        }
    }
    onOrderData=(event)=>{
        this.setState({data:event.data.data,page:event.data.page,total:event.data.total_pages,
            total_rec:event.data.total_rec,search:event.data.search,sort:"",filters:[],filteractive:"",display:false,buy:false});
    }
    render() { 
        let log=this.state.log;
        let data=this.state;
        if(!this.state.token){
            return (
                <div className="main-container">
                    <div className="Auth-container">
                        <div>
                            <button type="button" className="Login-jaffa" onClick={this.onLoginclicked}>Login</button>
                            <button type="button" className="signup-but" onClick={this.onSignupclicked}>Register</button>
                        </div>
                        <div>
                            {log?<Login onLoginDone={this.onLogin}/>:<Signup onSignupDone={this.onSignup}/>}
                        </div>
                    </div>
                </div>
            );
        }else{
            return(
                <div className="main-div">
                    <div className="parent-div">
                        <Home page={1} token={data.token} onHomeclicked={this.onDataReceiveFromHome}/>
                        <Search page={1}  token={data.token} onSearchDataReceive={this.onDataReceiveFromSearch}/>
                        <div className="cp-div">
                            <Cart token={data.token} onCartItems={this.onCartItemsReceived} cart_count={this.state.cart_count} page={1}/>
                            <Profile onDone={this.onLoggedout} onOrders={this.onOrderData} token={data.token}/>
                        </div>
                    </div>
                    <div className="sf-div">
                        <Sort display={data.display} data={data.data} onSortValue={this.onSetValue} />
                        <Filter display={data.display} filters={data.filters} onFilter={this.onFilterValue}/>
                    </div><br/>
                    <SortingData  sort={data.sort} filter={data.filteractive} token={data.token} search={data.search} onSortData={this.onSortDataReceived}/>
                    {/* <ApplyFilter filter={data.filteractive} token={data.token} search={data.search}/> */}
                    
                    {data.buy===false?<div className="base-div">
                        <Printer onBuyItemGame={this.onBuyGame} onCartCount={this.onCartCountReceived} token={data.token} data={data.data}/>
                    </div>:<Buy onCanceled={this.onCancel} onBuyDone={this.onbuyreset} token={data.token} item={data.itemtobuy}/>}
                </div>
            );
        }
    }
}
 
export default App;