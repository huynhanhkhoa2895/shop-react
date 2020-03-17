import React from 'react';
import Class1 from './Class1';
import Class2 from './Class2';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import appReducers from './reducer/index';
const store = createStore(
	appReducers, /* preloadedState, */
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
class App2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value : "Class",
            value2 : null,
        }
    }
    componentDidMount() {

    }
    parentClick(){
        console.log(this.state.value2);
    }
    render(){
        return (
            <Provider store={store}>
                <div className="container">
                    <div className="row">
                        <button onClick={this.parentClick.bind(this)}>CLICK TO FROM PARENT</button>
                    </div>
                    <div className="row">
                        <Class1 />
                        <Class2 />
                    </div>
                </div>
            </Provider>
        );
    }
  }
  
export default App2;