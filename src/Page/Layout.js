import React from 'react';
import Main from '../Widget/Main/Main.js';
import Header from '../Widget/Header/Header.js';
import Footer from '../Widget/Footer/Footer.js';
class Layout extends React.Component {
    render() {
        return (
            <>
                <Header />
                <Main />
                <Footer />
            </>
        )
    }
}
export default Layout;
