import React from 'react';
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
        fetch("http://127.0.0.1:3000/api/v1/getListOptionFilter")
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
    async changeFilter(filter){
        let obj = {...this.state.filter_active}
        let check = true;
        Object.keys(this.state.filter_active).map((e)=>{
            if(e == filter.id && obj[e] == filter.value){
                check = false
                return
            }
        }) 
            
        if(!check){
            delete obj[filter.id]
        }else{
            obj = {...this.state.filter_active,...{[filter.id] : filter.value}}
        }        
        await this.setState({
            filter_active : obj
        })
        this.props.changeFilter(this.state.filter_active)
    }
    loadFilter(){
        let xhtml = [];
        this.state.filter.map((e,key) =>
            xhtml.push(
                <div key={key+'-filter'} className="filter-container">
                    <div className="filter-title"><span>{e.name}</span></div>
                    <div className="filter-content">
                        <ul>
                            {this.state.filter_value.map((e2,key)=>{
                                if(e.id == e2.option_id){
                                    return <li key={key+'-value'}><span onClick={this.changeFilter.bind(this,{id : e2.option_id,value : e2.value_id})}>{e2.value}</span></li>
                                }
                            })}
                        </ul>
                    </div>
                </div>
            )
        )
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
