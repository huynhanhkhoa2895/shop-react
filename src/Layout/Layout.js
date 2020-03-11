import React from 'react';
import Main from '../Default/Main/Main.js';
import Header from '../Default/Header/Header.js';
import Footer from '../Default/Footer/Footer.js';
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
