import React from 'react';
import Helper from '../../lib/Helper'
import { Link } from 'react-router-dom';
import "../../Page/Checkout/Checkout.css"
import $ from 'jquery'

class Datatable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            thead : []
        }
    }
    componentWillMount(){
        let thead = [];
        Object.keys(this.props.tbody).map((e)=>{
            thead.push(e)
        })
        this.setState({
            thead : thead
        })
    }
    getTemplateOption(option){
        let xhtml = []
        let options = $.parseJSON(option)
        if(option != null){
            options.map((e,k)=>{
                xhtml.push(
                    <p key={k+"_p"}>
                        <span className="colorGrey f14 b">{e.option.name}: </span>
                        <span>{e.option_id == 2 ? <span style={{display : "inline-block",height : 15,width : 15,background : e.option.value}}></span> : e.option.value}</span>
                    </p>
                )
            })
        }
        return xhtml;
    }
    setTemplateData(data){
        let {each,page} = this.props;
        let arr = [];
        let num = 1;
        let start = (page*each) - each;
        let end = (page*each) - 1;
        data.forEach((e,k)=>{
            if(num > each) return false;
            if(k >= start && k <= end){
                arr.push(
                    <tr key={k+"12adsa"}>
                            {
                                Object.keys(this.props.tbody).map((e2,k2)=>{
                                    let tbody = this.props.tbody[e2];
                                    
                                    switch(tbody.type){
                                        case "text":
                                            return <td>{e[tbody.value]}</td>;
                                        case "total":
                                            return <td>{Helper.format_curency(e[tbody.value])} VND</td>;
                                        case "link":
                                            return <td><Link to={tbody.href+e[tbody.param]}>{tbody.value}</Link></td>
                                        case "product":
                                            return (
                                            <td>
                                                <div className="td-product">
                                                    <div className="product-image" style={{overflow : "hidden"}}>
                                                        <Link to={"/product/"+e.route}>
                                                            <img src={window.location.origin + "/product/"+e.img[0].name} alt={e.name}/>
                                                        </Link>
                                                    </div>
                                                    <div className="product-name">
                                                        <p><Link to={"/product/"+e.route}>{e.name}</Link></p>
                                                        {this.getTemplateOption(e.order_option)}
                                                    </div>
                                                </div>
                                            </td>
                                            )
                                    }
                                })

                            }
                    </tr>
                );
                num++;
            }
            
        })
        return arr;
    }
    choosePage(page){
        this.props.choosePage(page)
    }
    setTemplatePage(){
        let total = Math.ceil(this.props.data.length/this.props.each);
        let xhtml = []

        for(let i = 0;i < total;i++){
            xhtml.push(
                <div key={i+"fdafljsdakl"} className={"page "+((this.props.page == (i+1)) ? "activePage" : "")}>
                    <span onClick={()=>this.choosePage(i+1)}>{i+1}</span>
                </div>
            );

        }
        if(xhtml.length >= 2) return xhtml;
        else return [];
    }
    render(){
        const {thead,data} = this.props;
        return(
            <>
                <div className="row">
                    <div className="col-md-12 pd0">
                        <table className="table">
                            <thead>
                                <tr>
                                    {this.state.thead.map((e,k) => {
                                        return (<th key={k+"dfafdacxcvx"}>{e}</th>)
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {this.setTemplateData(data)}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 pd0 text-center">
                        <div className="link-page clear">
                            {this.setTemplatePage()}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
/*
1    0  4   
2    5  9
3    10 15
*/
export default Datatable