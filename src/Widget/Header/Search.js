
import React,{useEffect} from 'react';
import $ from 'jquery'
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeSearch : false,
            haveAnimate : false
        }
        this.openSearch = this.openSearch.bind(this)
    }
    openSearch(){
        if(this.state.activeSearch === false){
            this.setState({
                activeSearch : true,
                haveAnimate : false
            })
        }else{
            this.setState({
                activeSearch : false,
                haveAnimate : true
            })
        }

    }
    render(){
        return(
            <div className={"input-group input-group-sm input-group-search "+(this.state.activeSearch ? "active " : " ")+(this.state.haveAnimate ? "have-animate" : "")}>
                <div className="input-group-prepend">
                    <span onClick={this.openSearch} className={"input-group-text input-group-icon "} id="inputGroup-sizing-sm">
                        <FontAwesomeIcon icon={faSearch} color="#fff"/>
                    </span>
                </div>
                <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
            </div>
        );
    }
}
export default Search