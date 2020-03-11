import React from 'react';
class Category extends React.Component {
    constructor(props){
        super(props);
        // 
        console.log();
    }
    componentWillMount() {
        fetch("http://127.0.0.1:3000/api/v1/category/"+this.props.match.params.route)
          .then(res => res.json())
          .then(
            (result) => {
                console.log(result);
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }
    render() {
        return (
            <div>Trang Category</div>
        );
    }
}
export default Category;
