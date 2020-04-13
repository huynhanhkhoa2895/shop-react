import React from 'react';
import MinicartItem from './MinicartItem'
import $ from 'jquery'
class Minicart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            carts : this.props.carts,
            templateMinicart : null,
        };
        // this.handleChange = this.handleChange.bind(this);
        // this.removeItemInCart = this.removeItemInCart.bind(this);
        // console.log("MinicartItem",this.props.info);
        this.templateMinicart = this.templateMinicart.bind(this)
    }
    templateMinicart(){
        if($.isEmptyObject(this.state.carts)){
          return <div style={{marginTop : "100px", textAlign : "center"}}><span className="colorGrey f20">Không Có Sản Phẩm Nào</span></div>
        }else{
          let xhtml = [];
          this.state.carts.map((e,key)=>
            {
              xhtml.push(
                <MinicartItem key={key} info={e} removeItemInCart={this.removeItemInCart}/>
              )
            }
          )
          return xhtml;
        }
    }
    render(){
        return (
            <>
                {this.templateMinicart()}
            </>
            
        )
    }
}
export default Minicart;