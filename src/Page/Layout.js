import React from 'react';
import Main from '../Widget/Main/Main.js';
import Header from '../Widget/Header/Header.js';
import Footer from '../Widget/Footer/Footer.js';
import { getCookie } from '../Widget/Cookie/Cookie.js'
class Layout extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cart : getCookie('cart') === null ? {} : getCookie('cart'),
        }
    }
    componentWillMount(){   
    }

    render() {
        return (
            <main>
                <Header cart={this.state.cart}/>
                <Main cart={this.state.cart}/>
                <Footer />
            </main>
        )
    }
}
export default Layout;
