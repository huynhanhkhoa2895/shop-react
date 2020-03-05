import React from 'react';
import Header from '../Default/Header.js'
class Home extends React.Component {
    render() {
        return (
            <main>
                <Header />
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h1>Test</h1>
                        </div>
                        <div className="col">
                            <h1>Test 2</h1>
                        </div>
                    </div>
                </div>
            </main>
        );
      }
}

export default Home;
