import React from 'react';
import $ from 'jquery'
import Helper from '../../lib/Helper'
class LayerNavigation extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            filter : [],
            filter_value : [],
            filter_xhtml : [],
            filter_active : {}
        }
        // 
        this.loadFilter = this.loadFilter.bind(this);
    }
    componentWillMount() {
        fetch(Helper.apiUrl()+"api/v1/getListOptionFilter")
          .then(res => res.json())
          .then(
            (result) => {
                this.setState({
                    filter : result.option,
                    filter_value : result.value
                })
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          ).then(this.loadFilter)
      }
    async changeFilter(event,filter){
        let obj = {...this.state.filter_active}
        let check = true;
        Object.keys(this.state.filter_active).map((e)=>{
            if(e == filter.id && obj[e] == filter.value){
                check = false
                return
            }
        }) 
        $(".filter-item").removeClass("active")
        if(!check){
            delete obj[filter.id]
        }else{
            $(event.target).addClass("active")
            obj = {...this.state.filter_active,...{[filter.id] : filter.value}}
        }        
        await this.setState({
            filter_active : obj
        })
        this.props.changeFilter(this.state.filter_active)
    }
    loadFilter(){
        let xhtml = [];
        let classFilter = "";
        this.state.filter.map((e,key) =>{
            if(e.id == 1){
                classFilter = 'filter-size filter-item'
            }else if(e.id == 2){
                classFilter = 'filter-color filter-item'
            }else{
                classFilter = "filter-item"
            }
            xhtml.push(
                <div key={key+'-filter'} className="filter-container">
                    <div className="filter-title"><span>{e.name}</span></div>
                    <div className="filter-container">
                        <ul>
                            {this.state.filter_value.map((e2,key)=>{
                                if(e.id == e2.option_id){
                                    return(
                                        <li className="filter-content" key={key+'-value'} style={(e.id == 2) ? {maxWidth : '40px',display : 'inline-block',marginRight: '5px',marginBottom: '5px'} : {display : 'inline-block',marginRight: '5px'}}>
                                            <span style={(e.id == 2) ? {background : e2.value} : {}} className={classFilter} onClick={(event) => this.changeFilter(event,{id : e2.option_id,value : e2.value_id})}>{e.id == 2 ? '' : e2.value}</span>
                                        </li>
                                    )
                                }
                            })}
                        </ul>
                    </div>
                </div>
            )
        })
        this.setState({
            filter_xhtml : xhtml
        })
    }
    render() {
        return (
            <div className="layer-navigation">
                {this.state.filter_xhtml}
            </div>
        );
    }
}
export default LayerNavigation;
