import React from 'react';
import './ProductList.css';
import Product from '../../Widget/Product/Product.js';
import { Link,useLocation } from 'react-router-dom';
import $ from 'jquery'
import Helper from '../../lib/Helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMeh } from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux';

class ProductList extends React.Component {
    _isMounted = false;
    constructor(props){
        super(props);        
        this.state = {
            product : [],
            paginate : null,
            option : this.props.option,
            page : this.props.page == null ? '' : '&page='+this.props.page,
            activePage : false,
            key : 0
        }
    }
    componentDidMount() {
       this.loadData()
    }
    loadData(_page=null,option = this.props.option){
        let image = [];
        let page_xhtml = [];
        let product_xhtml = [];
        let page = _page;
        this.props.openLoading()
        if(_page == null && Helper.getQueryParams("page") != 0 && Helper.getQueryParams("page") != null){
            page = Helper.getQueryParams("page")
        }
        fetch(Helper.apiUrl()+"api/v1/product/list?" + $.param( option ) + ((this.props.pagination && page != null) ? ("&page=" + page) : ''))
          .then(res => res.json())
          .then(
            (result) => {                
                result.image.forEach(element => {
                    if(image[element.product_id] == null) image[element.product_id] = [];
                    image[element.product_id].push(element.name);
                });
                let product = [];
                let total = 0
                if(this.props.option.option.paginate == null){
                    product = result.product;
                    total = product.length;
                }else{
                    total = result.product.total
                    for(let i=1;i<=result.product.last_page;i++){
                        page_xhtml.push(                            
                            <div key={i} className={(Helper.getQueryParams('page') == i || (Helper.getQueryParams('page') == null && i==1)) ? 'page activePage' : 'page'}>
                                <Link to={"?page="+i} onClick={()=>this.clickChoosePage(i)}>{i}</Link>
                            </div>
                        )
                    }
                    this.setState({
                        paginate : page_xhtml,
                    })
                    product = result.product.data;
                }
                if(product != null){
                    product.map((e,index) => {
                        product_xhtml.push(
                                <div key={index+e.id} className="home-product-col">
                                    <Product 
                                        key={index}
                                        product = {e}
                                        images={image[e.id]} 
                                        id={e.id} 
                                        price={e.price} 
                                        brand={e.brand_name} 
                                        brand_route={e.brand_route}
                                        category={e.category_name} 
                                        category_route={e.category_route} 
                                        route={e.route} 
                                        small = {this.props.small == null || this.props.small == false ? false : true}
                                        name={e.name} />
                                </div>
                        )
                       
                    })
                }
                this.setState({product : product_xhtml})
                if(this.props.setTotalProduct != null){
                    this.props.setTotalProduct(total)
                }
                this.props.closeLoading()
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
    }
    clickChoosePage(page){
        this.loadData(page)
    }
    async componentWillReceiveProps(nextProps,prevState) {

        if(JSON.stringify(nextProps) != JSON.stringify(this.props)){
            let page = Helper.getQueryParams('page')        
            let option = {...this.props.option.option};
            if(!$.isEmptyObject(nextProps.sort)){
                option['order'] = nextProps.sort
            }
            if(!$.isEmptyObject(nextProps.filter)){
                let filter = nextProps.filter;
                let option_id = [];
                let option_value = [];
                if($.isEmptyObject(option['join'])){
                    option['join'] = [{
                        table : 'option_product',
                        on1 : 'option_product.product_id',
                        on2 : 'product.id'
                    }]
                }else{
                    option['join'] = {...option['join'],...[{
                        table : 'option_product',
                        on1 : 'option_product.product_id',
                        on2 : 'product.id'
                    }]}
                }
                if($.isEmptyObject(option['whereIn'])){
                    option['whereIn'] = {}
                }
                Object.keys(filter).map((e,k)=>{
                    option_id.push(e);
                    option_value.push(filter[e])
                })
                option['whereIn'] = {...option['whereIn'],...{'option_product.option_value' : option_id,'option_product.option_id' : option_value}}

                if($.isEmptyObject(this.props.filter)){
                    page = 1;
                    Helper.removeParamQuery("page");
                }
                // this.props.history.push(`${window.location.origin}/${window.location.pathname}`);
            }
            let _option = {option : option}
            await this.setState({
                product : [],
                option : _option,
                key : this.state.key += 1,
            })
            await this.loadData(page,_option)
        }
        
        // if(nextProps.option.page != Helper.getQueryParams('page')){

        // }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        return(
            <>
                {(this.state.product.length !== 0) ?                     
                    <div key={this.state.key} className="row-list-product" style={{width : "100%",margin : "auto "}}>
                        {this.state.product}
                        <div className="link-page clear">
                            {this.state.paginate}
                        </div>
                    </div>
                    :
                    <div className="empty-product" style={{marginTop : "30px"}}>
                        <div className="text-center"><FontAwesomeIcon icon={faMeh} color="#ccc" size="6x" /></div>
                        <div className="colorGrey text-center" style={{fontSize : '20px'}}>XIN LỖI! HIỆN KHÔNG CÓ SẢN PHẨM NÀO</div>
                    </div>
                }
            </>
        );
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        openLoading : ()=>{
          dispatch({type : 'OPEN_LOADING'})
        },
        closeLoading : ()=>{
          dispatch({type : 'CLOSE_LOADING'})
        },
    }
  }
export default connect(null, mapDispatchToProps)(ProductList);
