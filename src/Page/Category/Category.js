import React from 'react';
import LayerNavigation from './LayerNavigation';
import './Category.css';
import ProductList from '../../Widget/ProductList/ProductList'
import $ from 'jquery'
import queryString from 'query-string';
import Helper from '../../lib/Helper'
class Category extends React.Component {
    constructor(props){
        super(props);
        this.state= {
          info : {},
          table : {},
          filter : 1,
          option : {},
          route : this.props.match.params.route,
          page : queryString.parse(this.props.location.search).page == null ? null : queryString.parse(this.props.location.search).page
        }
        this.changeFilter = this.changeFilter.bind(this)
        this.loadData = this.loadData.bind(this)
    }
    async changeFilter(filter){
      await this.setState({filter : filter})
    }
    componentDidMount() {
      this.loadData()
    }
    loadData(){
      fetch(Helper.apiUrl()+"api/v1/category/"+this.state.route)
      .then(res => res.json())
      .then(
        (result) => {
          console.log("fetch data success",this.state.route)
          this.setState({
            info : result.info,
            table : result.table
          })
          let option = 
          {
            page : this.state.page,
            option : {
              order : {"product.created_at" : "desc"},
              route : {...this.state.info,table : this.state.table},
              leftJoin : this.state.table == 'group' ? [
                {
                  table : this.state.table+'_detail',
                  on1 : this.state.table+'_detail.product_id',
                  on2 : 'product.id'
                }
              ] : [],
              paginate : 8,
            }
          }
          console.log(option);
          this.setState({
            option : option
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    }
    async componentWillReceiveProps(nextProps,nextState){
      if(this.props.match.params.route != nextProps.match.params.route){
        await this.setState({
          route : nextProps.match.params.route
        })
        this.loadData()
      }
    }
    render() {
        console.log("Category",this.state.option)
        let xhtml = <></>
        if(!$.isEmptyObject(this.state.table) && !$.isEmptyObject(this.state.option)){
          xhtml = 
          <div className="container-fluid" style={{paddingTop : "30px"}}>
            <div className="row w100">
              <div className="col-md-2">
                <LayerNavigation changeFilter={this.changeFilter} />
              </div>
              <div className="col-md-10 pd0">
                <div className="product-list-title">
                  <h3>{this.state.info.name}</h3>
                </div>
                <div className="product-list-category w100">
                  <ProductList filter={this.state.filter} option={this.state.option} />
                </div>
              </div>
            </div>
          </div>
        }
        return (    
          <>      
          {xhtml}
          </>
        );
    }
}
export default Category;
