import React from 'react';
import Main from '../Default/Main/Main.js';
import Header from '../Default/Header/Header.js';
class Layout extends React.Component {
    render() {
        return (
            <main>
                <Header />
                <Main />
            </main>
        )
    }
}
export default Layout;
