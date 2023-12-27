import React, { Component } from 'react';
import axios from 'axios';
class SortingData extends Component {
    onSort=()=>{
        if(this.props.sort && this.props.filter){
            axios.post(`https://games-server519.herokuapp.com/api/user/games?page=1&sort=${this.props.sort}&filter=${this.props.filter}`,{search:this.props.search},{
                headers:{
                    token:this.props.token
                }
            }).then((res)=>{
                this.props.onSortData({data:res.data});
            }).catch((err)=>{
                console.log(err);
            })
        }else if(this.props.sort && !this.props.filter){
            axios.post(`https://games-server519.herokuapp.com/api/user/games?page=1&sort=${this.props.sort}`,{search:this.props.search},{
                headers:{
                    token:this.props.token
                }
            }).then((res)=>{
                this.props.onSortData({data:res.data});
            }).catch((err)=>{
                console.log(err);
            })
        }else if(!this.props.sort && this.props.filter){
            axios.post(`https://games-server519.herokuapp.com/api/user/games?page=1&filter=${this.props.filter}`,{search:this.props.search},{
                headers:{
                    token:this.props.token
                }
            }).then((res)=>{
                this.props.onSortData({data:res.data});
            }).catch((err)=>{
                console.log(err);
            })
        }
    }
    render() { 
        return (
            <div>
                {this.onSort()}
            </div>
        );
    }
}
 
export default SortingData;