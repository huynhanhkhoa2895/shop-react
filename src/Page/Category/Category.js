import React,{useEffect} from 'react';
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
        let xhtml = <></>
        if(!$.isEmptyObject(this.state.table) && !$.isEmptyObject(this.state.option)){
          if(this.state.option.option.route.route == this.props.match.params.route){
            xhtml = 
            <div className="container-fluid" style={{paddingTop : "30px"}}>
              <div className="row w100">
                <div className="col-md-2">
                  <LayerNavigation changeFilter={this.changeFilter} />
                </div>
                <div className="col-md-10 pd0">
                  <div className="row mgb20">
                    <div className="col">
                      <div className="product-list-title">
                        <h3 className="colorGrey">{this.state.info.name}</h3>
                      </div>
                    </div>
                    <div className="col text-right">
                      <select className="select-filter">
                        <option value="1">Sắp xếp ngày thêm gần nhất</option>
                        <option value="1">Sắp xếp ngày thêm lâu nhất</option>
                        <option value="1">Sắp xếp giá tăng dần</option>
                        <option value="1">Sắp xếp giá giảm dần</option>
                        <option value="1">Sắp xếp a->z</option>
                        <option value="1">Sắp xếp z->a</option>
                      </select>
                    </div>
                  </div>
                  <div className="product-list-category w100">
                    <ProductList filter={this.state.filter} option={this.state.option} />
                  </div>
                </div>
              </div>
            </div>
          }
        }
        return (    
          <>      
          {xhtml}
          </>
        );
    }
}
export default Category;
