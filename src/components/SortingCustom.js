import React, { Component } from 'react';


class Sorting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      className: 'Tblsort sorting',
    };
    this.SortColumn = this.SortColumn.bind(this);
  }
  SortColumn(col_name) {
    let TblSort = document.getElementsByClassName('Tblsort');
    for (let i = 0;i < TblSort.length;i++) {
      TblSort[i].className = 'Tblsort sorting';
    }
    let sort = '';
    let sortOrder = '';
    if (this.state.className === 'Tblsort sorting') {
      sort = col_name;
      sortOrder = 'asc';
      this.setState({ className: 'Tblsort sorting_asc' });
    } else if (this.state.className === 'Tblsort sorting_asc') {
      sort = col_name;
      sortOrder = 'desc';
      this.setState({ className: 'Tblsort sorting_desc' });
    } else if (this.state.className === 'Tblsort sorting_desc') {
      sort = col_name ;
      sortOrder = 'asc';
      this.setState({ className: 'Tblsort sorting_asc' });
    }
    this.props.setSortColumn(sort, sortOrder);
  }
  render() {
    return (
      <span className={this.state.className} onClick={() => this.SortColumn(this.props.columnName)}>{this.props.displayName}</span>
    );
  }
}

export default Sorting;
