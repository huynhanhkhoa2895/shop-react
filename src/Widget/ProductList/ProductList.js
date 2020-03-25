import React from 'react';
import './ProductList.css';
import Product from '../../Widget/Product/Product.js';
import { Link } from 'react-router-dom';
import $ from 'jquery'
import Helper from '../../lib/Helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMeh } from '@fortawesome/free-solid-svg-icons'
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
    componentWillMount() {
        this._isMounted = true;
        console.log('componentWillMount','loadData')
        this.loadData()
    }
    loadData(){
        let image = [];
        let page_xhtml = [];
        let product_xhtml = [];
        fetch("http://127.0.0.1:3000/api/v1/product/list?" + $.param( this.state.option ) + this.state.page)
          .then(res => res.json())
          .then(
            (result) => {                
                result.image.forEach(element => {
                    if(image[element.product_id] == null) image[element.product_id] = [];
                    image[element.product_id].push(element.name);
                });
                let product = [];
                if(this.props.option.option.paginate == null){
                    product = result.product                    
                }else{
                    
                    for(let i=1;i<=result.product.last_page;i++){
                        page_xhtml.push(                            
                            <div key={i} className={(Helper.getQueryParams('page') == i || (Helper.getQueryParams('page') == null && i==1)) ? 'page activePage' : 'page'}>
                                <Link to={"?page="+i} onClick={this.clickChoosePage}>{i}</Link>
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
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
    }
    async componentWillReceiveProps(nextProps) {
        let page = Helper.getQueryParams('page')        
        let option = {...this.props.option.option};
        console.log(nextProps.filter);
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
        }
        let _option = {option : option}
        console.log(option)
        await this.setState({
            product : [],
            option : _option,
            page : page == null ? '' : '&page='+page,
            key : this.state.key += 1,
        })
        this.loadData()
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
export default ProductList;