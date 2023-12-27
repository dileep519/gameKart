import React, { Component } from 'react';
import './Search.css';
import Axios from 'axios';
class Search extends Component {
    state = { 
        value:""
     }
    onSearchClicked=()=>{
        if(this.state.value){
            Axios.post(`https://games-server519.herokuapp.com/api/user/games?page=${this.props.page}`,{search:this.state.value},{
                headers:{
                    token:`${this.props.token}`
                }
            }).then((res)=>{
                this.props.onSearchDataReceive({data:res.data});
            }).catch((err)=>{
                console.log(err);
            })
        }else{
            let data={
                data:[],
                error:""
            }
            this.props.onSearchDataReceive({data})
        }
    }
    onSearchChanged=(event)=>{
        this.setState({value:event.target.value});
    }
     componentDidMount(){
         const authAxios=Axios.create({
             baseURL:`https://games-server519.herokuapp.com/api/user`,
             headers:{
                 token:`${this.props.token}`
             }
         });
         authAxios.post(`/games?page=${this.props.page}`,{search:this.state.value}).then((res)=>{
             this.props.onSearchDataReceive({data:res.data});
         }).catch((err)=>{
             console.log(err);
         })
     }
     onEnterPressed=(event)=>{
         if(event.key==='Enter'){
            if(this.state.value){
                Axios.post(`https://games-server519.herokuapp.com/api/user/games?page=${this.props.page}`,{search:this.state.value},{
                    headers:{
                        token:`${this.props.token}`
                    }
                }).then((res)=>{
                    this.props.onSearchDataReceive({data:res.data});
                }).catch((err)=>{
                    console.log(err);
                })
            }else{
                let data={
                    data:[],
                    error:""
                }
                this.props.onSearchDataReceive({data})
            }
         }
     }
    render() { 
        return ( 
            <div className="search-div">
                <input onKeyPress={this.onEnterPressed} onChange={this.onSearchChanged}  className="search-text" type="text" placeholder="Search" value={this.state.value}/>
                <button  className="submit-but" onClick={this.onSearchClicked} type="button">Search</button>
            </div>
         );
    }
}
 
export default Search;





