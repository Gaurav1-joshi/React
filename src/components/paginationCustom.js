import React, { Component } from "react";
import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";
import '../App.css';
// require("bootstrap/less/bootstrap.less"); 
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1
    };
  }
 
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    if(this.props.data != null) {
      this.props.handlePageChange(pageNumber);
    }
    this.setState({activePage: pageNumber});
  }
 
  render() {
    return (
      <div className="DivPager">
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.props.pageSize || 10}
          totalItemsCount={this.props.totalRecords || 1000}
          pageRangeDisplayed={5}
          onChange={(page_number) => this.handlePageChange(page_number)}
          innerClass="pagination"
          activeClass="active"
          prevPageText="Prev"
          nextPageText="Next"
          hideDisabled={true}
          //onChange={(e)=this.handlePageChange(e)}
        />
      </div>
    );
  }
}
export default App;




