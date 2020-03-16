import React from 'react';
import Main from '../Widget/Main/Main.js';
import Header from '../Widget/Header/Header.js';
import Footer from '../Widget/Footer/Footer.js';
class Layout extends React.Component {
    render() {
        return (
            <main>
                <Header />
                <Main />
                <Footer />
            </main>
        )
    }
}
export default Layout;
