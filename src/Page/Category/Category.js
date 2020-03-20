import React from 'react';
import LayerNavigation from './LayerNavigation';
import './Category.css';
import ProductList from '../../Widget/ProductList/ProductList'
import $ from 'jquery'
class Category extends React.Component {
    constructor(props){
        super(props);
        this.state= {
          info : {},
          table : {}
        }
        // 
        console.log();
    }
    componentWillMount() {
        fetch("http://127.0.0.1:3000/api/v1/category/"+this.props.match.params.route)
          .then(res => res.json())
          .then(
            (result) => {
              console.log(result);
              this.setState({
                info : result.info,
                table : result.table
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
        let {info} = this.state
        console.log(this.state);
        console.log({[this.state.table] : 'ok'})
        let xhtml = <></>
        if(!$.isEmptyObject(this.state.table)){
          xhtml = 
          <div className="container-fluid" style={{paddingTop : "30px"}}>
            <div className="row w100">
              <div className="col-md-3">
                <LayerNavigation />
              </div>
              <div className="col-md-9 pd0">
                <div className="product-list-title">
                  <h3>{this.state.info.name}</h3>
                </div>
                <div className="product-list-category w100">
                  <ProductList option={{option : {order : {"product.created_at" : "desc"},leftJoin : [{table : this.state.table+'_detail', on1 : this.state.table+'_detail.product_id',on2 : 'product.id'}], where : {[this.state.table+'_detail.group_id'] : this.state.info.id}}}} />
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
