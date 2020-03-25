import React from 'react';
import LayerNavigation from './LayerNavigation';
import './Category.css';
import ProductList from '../../Widget/ProductList/ProductList'
import $ from 'jquery'
import queryString from 'query-string';
class Category extends React.Component {
    constructor(props){
        super(props);
        this.state= {
          info : {},
          table : {},
          filter : 1,
          option : {},
          page : queryString.parse(this.props.location.search).page == null ? null : queryString.parse(this.props.location.search).page
        }
        this.changeFilter = this.changeFilter.bind(this)
    }
    async changeFilter(filter){
      await this.setState({filter : filter})
    }
    componentWillMount() {
        fetch("http://127.0.0.1:3000/api/v1/category/"+this.props.match.params.route)
          .then(res => res.json())
          .then(
            (result) => {
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
    render() {
        let xhtml = <></>
        console.log('option',this.state.option);
        if(!$.isEmptyObject(this.state.table)){
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
