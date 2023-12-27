import React, { Component } from 'react';
import './Sort.css';
class Sort extends Component {
    onSortRank=()=>{
        // let data=[...this.state.data];
        // data.sort((a,b)=>{
        //     return a.Rank-b.Rank;
        // })
        // this.props.onSortDataReceive(data);
        this.props.onSortValue('Rank');
    }
    onSortCost=()=>{

        // let data=[...this.state.data];
        // data.sort((a,b)=>{
        //     return a.Price-b.Price;
        // })
        // this.props.onSortDataReceive(data);
        this.props.onSortValue('Price')
    }
    render() { 
        if(this.props.display){
            return ( 
                <div className="dropdown">
                    <button className="dropbtn">Sort</button>
                    <div className="dropdown-content">
                        <button className="but-rank" onClick={this.onSortRank}>Rank</button>
                        <button className="but-cost" onClick={this.onSortCost}>Cost</button>
                    </div>
                </div>
             );
        }else{
            return(
                <div></div>
            );
        }
    }
}
 
export default Sort;