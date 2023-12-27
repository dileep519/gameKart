import React, { Component } from 'react';
import './Filter.css';
class Filter extends Component {
    state = {  }
    onListFilters=()=>{
        return this.props.filters.map((e,i)=>{
            if(e!=='N/A'){
            return <button key={i} onClick={this.onFilterClicked} className="buttons-filters" type="button">{e}</button>
            }else{
                return null;
            }
        })
    }
    onFilterClicked=(event)=>{
        event.persist();
        this.props.onFilter(event.target.innerText);
    }
    render() { 
        if(this.props.display){
            return ( 
                <div className="filter-dropdown">
                    <button className="filter-div">Filter</button>
                    <div className="dropdown-filters">
                        {this.onListFilters()}
                    </div>
                </div>
             );
        }else{
            return(
                <div>
                    
                </div>
            );
        }
    }
}
 
export default Filter;