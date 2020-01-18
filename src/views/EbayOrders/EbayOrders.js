import React from 'react';
import axios from 'axios';
import { API_URL } from '../../actions/utilAction';
import classNames from 'classnames';
import { CSVLink } from "react-csv";
import SortingCustom from '../../components/SortingCustom';
import './../../App.css';

import { UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Table } from 'reactstrap';
import SubString from 'cut-substring';


class EbayOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSize: 10,
            pageNo: 1,
            sortOrder: 'asc',
            orderBy: 'orderid',
            ebayOrdersData: [],
            factOrderData: [],
            meta: {},
            OrderId: null,
            loading: false,
            loadingNestedData: false,
            activeFilter: 'All',
            exporteBayData: [],
            exporteBayFactOrderData: [],
            scrollcount: 5,
            scrollLoading: false,
            open: false,
            lazyLoadedFactOrderData: [],
            updatedFactOrders: []
        }
    }

    container = React.createRef();
    state = {
        open: false,
        multipleOrderIds: []
    };

    componentDidMount = () => {
        document.addEventListener("mousedown", this.handleClickOutside);
        // ReactDOM.findDOMNode(this.refs.table).addEventListener('scroll', this.handleScroll);
        window.addEventListener('scroll', this.handleScroll, { passive: true })
        this.setState({ userId: localStorage.getItem("userId") });
        if (this.props.userId == null || this.props.userId === '' || localStorage.getItem('token') == null) {
            this.props.history.push('/login');
        }
        this.setState({
            loading: true
        })
        let ebayOrdersAPI = `${API_URL}/api/Warehouse/GetEbayOrders?PageSize=20&PageNo=${this.state.pageNo}&SortOrder=${this.state.sortOrder}&OrderBy=${this.state.orderBy}`;
        if (this.state.OrderId != null || this.state.OrderId === '') {
            ebayOrdersAPI += `&${this.state.activeFilter}=${this.state.OrderId}`;
        }
        ebayOrdersAPI = ebayOrdersAPI.replace(/%20/g, " ")
        axios.get(ebayOrdersAPI,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } }
        )
            .then(res => {
                let multipleOrderIds = res.data.data.map((data, index) => {
                    return data.orderID
                });
                let lazyLoadedFactOrdersApi = `${API_URL}/api/Warehouse/GetFactOrderDetails?OrderIds=${multipleOrderIds}`;
                axios.get(lazyLoadedFactOrdersApi, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
                    .then(res => {
                        this.setState({
                            lazyLoadedFactOrderData: res.data.data,
                        });
                    })
                    .catch(error => {
                        this.props.history.push('/login');
                        console.log(error.response)
                    });
                this.setState({
                    ebayOrdersData: res.data.data,
                    meta: res.data.meta,
                    multipleOrderIds: multipleOrderIds
                });
            })
            .catch(error => {
                this.props.history.push('/login');
                console.log(error.response)
            });
        let exporteBayDataAPI = `${API_URL}/api/Warehouse/GetEbayOrders?PageSize=1000&PageNo=1&SortOrder=${this.state.sortOrder}&OrderBy=${this.state.orderBy}`;
        axios.get(exporteBayDataAPI, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
            .then(res => {
                this.setState({
                    exporteBayData: res.data.data,
                });
            })
            .catch(error => {
                this.props.history.push('/login');
                console.log(error.response)
            });

        let exporteBayFactOrderAPI = `${API_URL}/api/Warehouse/ExportFactOrders`;
        axios.get(exporteBayFactOrderAPI, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
            .then(res => {
                this.setState({
                    exporteBayFactOrderData: res.data.data,
                });
            })
            .catch(error => {
                this.props.history.push('/login');
                console.log(error.response)
            });
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside = event => {
        if (this.container.current && !this.container.current.contains(event.target)) {
            this.setState({
                open: false,
            });
        }
    };

    handleButtonClick = () => {

        this.setState(state => {
            return {
                open: !state.open,
            };
        });
    };


    handleScroll = e => { 

        var objDiv = document.getElementById("your_div");

        if (objDiv != null && objDiv.scrollTop !== 0) {
            var offset = objDiv.scrollTop + objDiv.offsetHeight;
            var height = objDiv.scrollHeight;
            if (offset === height) {
                this.setState({ scrollLoading: true })
                let scrollCount = this.state.scrollcount;
                scrollCount = scrollCount + 1;
                this.setState({ scrollcount: scrollCount, loading: true })

                let ebayOrdersData = this.state.ebayOrdersData;
                let ebayOrdersAPI = `${API_URL}/api/Warehouse/GetEbayOrders?PageSize=${this.state.pageSize}&PageNo=${scrollCount}&SortOrder=${this.state.sortOrder}&OrderBy=${this.state.orderBy}`;
                if (this.state.OrderId != null || this.state.OrderId === '') {
                    ebayOrdersAPI += `&${this.state.activeFilter}=${this.state.OrderId}`;
                }
                ebayOrdersAPI = ebayOrdersAPI.replace(/%20/g, " ")
                axios.get(ebayOrdersAPI,
                    { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } }
                )
                    .then(res => {
                        ebayOrdersData = ebayOrdersData.concat(res.data.data)
                        let lazyLoadedFactOrderData = this.state.lazyLoadedFactOrderData;
                        let newOrderData = res.data.data;
                        let newOrderIds = newOrderData.map((data) => {
                            return data.orderID
                        });
                        let lazyLoadedFactOrdersApi = `${API_URL}/api/Warehouse/GetFactOrderDetails?OrderIds=${newOrderIds}`;
                        axios.get(lazyLoadedFactOrdersApi, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
                            .then(res => {
                                lazyLoadedFactOrderData = lazyLoadedFactOrderData.concat(res.data.data);

                                lazyLoadedFactOrderData = lazyLoadedFactOrderData
                                    .map(e => e.orderID)
                                    // store the keys of the unique objects
                                    .map((e, i, final) => final.indexOf(e) === i && i)
                                    // eliminate the dead keys & store unique objects
                                    .filter(e => lazyLoadedFactOrderData[e]).map(e => lazyLoadedFactOrderData[e]);
                                this.setState({
                                    lazyLoadedFactOrderData: lazyLoadedFactOrderData,
                                });
                            })
                            .catch(error => {
                                this.props.history.push('/login');
                                //console.log(error.response)
                            });
                        this.setState({
                            ebayOrdersData: ebayOrdersData,
                            meta: res.data.meta,
                            loading: false
                        });
                    })
                    .catch(error => {
                        this.props.history.push('/login');
                        //console.log(error.response)
                    });
            }
            else {
                this.setState({ scrollLoading: false })
            }
        }

    }

    setSortColumn = (col_name, sortOrder) => {
        this.setState({
            loading: true,
            ebayOrdersData: []
        })
        var self = this;
        // let pageNo = this.state.pageNo;
        if (col_name) {
            let ebayOrdersAPI = `${API_URL}/api/Warehouse/GetEbayOrders?PageSize=20&PageNo=${self.state.pageNo}&SortOrder=${sortOrder}&OrderBy=${col_name}`;
            if (this.state.OrderId !== null) {
                ebayOrdersAPI += `&${this.state.activeFilter}=${this.state.OrderId}`
                ebayOrdersAPI = ebayOrdersAPI.replace(/%20/g, " ")
            }
            axios.get(ebayOrdersAPI,
                { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } }
            )
                .then(res => {
                    let lazyLoadedFactOrderData = this.state.lazyLoadedFactOrderData;
                    let newOrderIds = res.data.data.map((data) => {
                        return data.orderID
                    });
                    let lazyLoadedFactOrdersApi = `${API_URL}/api/Warehouse/GetFactOrderDetails?OrderIds=${newOrderIds}`;
                    axios.get(lazyLoadedFactOrdersApi, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
                        .then(res => {
                            lazyLoadedFactOrderData = lazyLoadedFactOrderData.concat(res.data.data);

                            lazyLoadedFactOrderData = lazyLoadedFactOrderData
                                .map(e => e.orderID)
                                // store the keys of the unique objects
                                .map((e, i, final) => final.indexOf(e) === i && i)
                                // eliminate the dead keys & store unique objects
                                .filter(e => lazyLoadedFactOrderData[e]).map(e => lazyLoadedFactOrderData[e]);
                            this.setState({
                                lazyLoadedFactOrderData: lazyLoadedFactOrderData,
                            });
                        })
                        .catch(error => {
                            this.props.history.push('/login');
                           // console.log(error.response)
                        });
                    this.setState({
                        ebayOrdersData: res.data.data,
                        meta: res.data.meta,
                        loading: false
                    });
                })
                .catch(error => {
                    this.props.history.push('/login');
                    //console.log(error.response)
                });
            this.setState({
                sortOrder: sortOrder,
                orderBy: col_name
            })
        }
    }

    loadData(pageNumber, obj) {
        this.setState({
            loading: true,
            ebayOrdersData: []
        })
        let ebayOrdersAPI = `${API_URL}/api/Warehouse/GetEbayOrders?PageSize=${this.state.pageSize}&PageNo=${pageNumber}&SortOrder=${this.state.sortOrder}&OrderBy=${this.state.orderBy}`;
        if (this.state.OrderId !== null) {
            ebayOrdersAPI += `&${this.state.activeFilter}=${this.state.OrderId}`
            ebayOrdersAPI = ebayOrdersAPI.replace(/%20/g, " ")

        }
        axios.get(ebayOrdersAPI,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } }
        )
            .then(res => {
                this.setState({
                    ebayOrdersData: res.data.data,
                    meta: res.data.meta,
                    loading: false
                });
            })
            .catch(error => {
                this.props.history.push('/login');
                //console.log(error.response)
            });
        this.setState({
            pageNo: pageNumber,
        })
    };

    setActiveFilter = (e) => {
        let activeFilter = e.currentTarget.id;
        this.setState({ activeFilter: activeFilter, open: false })
    }

    handleOrderNumber = (e) => {
        if (e.target.value.length > 3) {
            this.setState({
                loading: true,
                ebayOrdersData: []
            })
            var objDiv = document.getElementById("your_div");
            if (objDiv != null) {
                objDiv.scrollTop = 0;
            }

            let ebayOrdersAPI = `${API_URL}/api/Warehouse/GetEbayOrders?PageSize=10000&PageNo=1&SortOrder=${this.state.sortOrder}&OrderBy=${this.state.orderBy}&${this.state.activeFilter}=${e.target.value}`;
            ebayOrdersAPI = ebayOrdersAPI.replace(/%20/g, " ")
            axios.get(ebayOrdersAPI,
                { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } }
            )
                .then(res => {
                    let lazyLoadedFactOrderData = this.state.lazyLoadedFactOrderData;
                    let newOrderIds = res.data.data.map((data) => {
                        return data.orderID
                    });
                    let lazyLoadedFactOrdersApi = `${API_URL}/api/Warehouse/GetFactOrderDetails?OrderIds=${newOrderIds}`;
                    axios.get(lazyLoadedFactOrdersApi, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
                        .then(res => {

                            lazyLoadedFactOrderData = lazyLoadedFactOrderData.concat(res.data.data);

                            lazyLoadedFactOrderData = lazyLoadedFactOrderData
                                .map(e => e.orderID)
                                // store the keys of the unique objects
                                .map((e, i, final) => final.indexOf(e) === i && i)
                                // eliminate the dead keys & store unique objects
                                .filter(e => lazyLoadedFactOrderData[e]).map(e => lazyLoadedFactOrderData[e]);
                            this.setState({
                                lazyLoadedFactOrderData: lazyLoadedFactOrderData,
                                updatedFactOrders: res.data.data
                            });
                        })
                        .catch(error => {
                            this.props.history.push('/login');
                           // console.log(error.response)
                        });
                    this.setState({
                        ebayOrdersData: res.data.data,
                        meta: res.data.meta,
                        loading: false,
                    });
                })
                .catch(error => {
                    this.props.history.push('/login');
                    //console.log(error.response)
                });
            this.setState({
                OrderId: e.target.value
            })
        }
        else if (e.target.value.length < 1) {
            this.setState({ OrderId: null })
            this.setState({
                loading: true,
                ebayOrdersData: []
            })
            let ebayOrdersAPI = `${API_URL}/api/Warehouse/GetEbayOrders?PageSize=10&PageNo=1&SortOrder=${this.state.sortOrder}&OrderBy=${this.state.orderBy}`;
            ebayOrdersAPI = ebayOrdersAPI.replace(/%20/g, " ")
            axios.get(ebayOrdersAPI,
                { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } }
            )
                .then(res => {
                    this.setState({
                        ebayOrdersData: res.data.data,
                        meta: res.data.meta,
                        loading: false,
                    });
                })
                .catch(error => {
                    this.props.history.push('/login');
                    //console.log(error.response)
                });
            this.setState({
                OrderId: null
            })
        }
    }

    handleExpandRow = (rowid) => {
        this.setState({
            loadingNestedData: true,
            factOrderData: []
        })

        let display = this.refs['auth' + rowid].style.display;
        let oldExpandedStyleRow = Object.keys(this.refs).find((key) => this.refs[key].style.display === 'table-row');
        let oldExpandedClassRow = Object.keys(this.refs).find((key) => this.refs[key].className === 'fa fa-minus-circle');
        if (display === 'none') {
            var rebels = this.state.lazyLoadedFactOrderData.filter(function (pilot) {
                return pilot.orderID === rowid;
            });
            this.setState({
                factOrderData: rebels,
            });
            if (oldExpandedStyleRow && oldExpandedClassRow) {
                this.refs[oldExpandedStyleRow].style.display = 'none';
                this.refs[oldExpandedClassRow].className = 'fa fa-plus-circle';
            }
            this.refs['auth' + rowid].style.display = 'table-row';
            this.refs['authClass' + rowid].className = 'fa fa-minus-circle';
        } else {
            this.setState({ selectedRowId: null });
            this.refs['auth' + rowid].style.display = 'none';
            this.refs['authClass' + rowid].className = 'fa fa-plus-circle';
        }
    };


    renderAppointments() {
        let ebayList = this.state.ebayOrdersData;

        ebayList = ebayList
            .map(e => e.orderID)

            // store the keys of the unique objects
            .map((e, i, final) => final.indexOf(e) === i && i)

            // eliminate the dead keys & store unique objects
            .filter(e => ebayList[e]).map(e => ebayList[e]);

        const tableClass1 = classNames({
            'table': true,
            'middletable': true,
            'table-stripe': true,
        });
        const tableClass2 = classNames({
            'table': true,
            'childtable': true,
        });
        if (ebayList && ebayList.length && this.state.lazyLoadedFactOrderData.length > 0) {
            return ebayList.map((obj, index) => {
                return (
                    <tr key={obj.orderID}>
                        <td colSpan={7} className="expandRow">
                            <table className={`${tableClass1} innertable-container`}>
                                <tbody>
                                    <tr>

                                        <td width="12%">{obj.storeOrderNumber}</td>
                                        <td width="12%">{obj.itemNumber}</td>
                                        <td width="18%">{obj.trackingNumber}</td>
                                        <td width="10%">{obj.kitSKU}</td>
                                        <td width="13%">{obj.customer}</td>
                                        {<td width="30%" title={obj.address && obj.address.length > 60 ? obj.address : null}>{obj.address !== null && obj.address.length > 60 ? SubString(obj.address, 60, obj.address.length) + '...' : obj.address !== null ? obj.address : 'N/A'}</td>}
                                        <td width="5%">
                                            <button onClick={(e) => this.handleExpandRow(obj.orderID)} className="morebtn">
                                                <i ref={'authClass' + obj.orderID} className="fa fa-plus-circle" aria-hidden="true"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="nohover" ref={'auth' + obj.orderID} style={{ 'display': 'none' }}>
                                        <td colSpan={7} className="colspan-container">
                                            <table className={`${tableClass2} ordersTable`}>

                                                <tbody className="innertable">

                                                    {this.state.factOrderData.length ? (this.state.factOrderData || []).map((data, i) => {
                                                        return (
                                                            this.state.factOrderData.length ?
                                                                <tr key={i}>
                                                                    <td width="12%" className="text-left"><span className="heading">Item Number</span> <span className="data">{data.storeOrderDetailID}</span></td>
                                                                    <td width="12%" className="text-left"><span className="heading">Box SKU</span> <span className="data">{data.boxSKU}</span></td>
                                                                    <td width="18%" className="text-left"><span className="heading">Box Quantity</span> <span className="data">{data.boxQty}</span></td>
                                                                    <td width="10%" className="text-left"><span className="heading">Sales Price</span> <span className="data">{data.salesPrice}</span></td>
                                                                    <td width="13%" className="text-left"><span className="heading">Shipping Cost</span> <span className="data">{data.shippingCostOnShipped}</span></td>
                                                                    <td colSpan={2}></td>

                                                                </tr> :
                                                                <tr>
                                                                    <td colSpan={6} className="text-center no-record">{this.state.loadingNestedData ? 'Loading, Please wait...' : 'No record found.'}</td>
                                                                </tr>
                                                        );
                                                    }) :
                                                        <tr>
                                                            <td width="15%" className="text-left"><span className="heading">Item Number</span> <span className="data">N/A</span></td>
                                                            <td width="15%" className="text-left"><span className="heading">Box SKU</span> <span className="data">N/A</span></td>
                                                            <td width="15%" className="text-left"><span className="heading">Box Quantity</span> <span className="data">N/A</span></td>
                                                            <td width="10%" className="text-left"><span className="heading">Sales Price</span> <span className="data">N/A</span></td>
                                                            <td width="10%" className="text-left"><span className="heading">Shipping Cost</span> <span className="data">N/A</span></td>
                                                            <td colSpan={2}></td>

                                                        </tr>
                                                    }
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                );
            });
        }
        return null;


    }

    render() {
        let headers = [
            { label: 'Order Number', key: 'orderID' },
            { label: 'Item Number', key: 'itemString' },
            { label: 'Tracking Number', key: 'trackingNumber' },
            { label: 'Item', key: 'kitSKU' },
            { label: 'Customer', key: 'customer' },
            { label: 'Address', key: 'address' }
        ];
        let FactOrderDataHeaders = [
            { label: 'Item Number', key: 'storeOrderDetailID' },
            { label: 'Box SKU', key: 'boxSKU' },
            { label: 'Box Quantity', key: 'boxQty' },
            { label: 'Sales Price', key: 'salesPrice' },
            { label: 'Shipping Cost', key: 'shippingCostOnShipped' },

        ];
        let data = this.state.exporteBayData;
        let eBayData = this.state.exporteBayFactOrderData;
        const tableClass = classNames({
            'table': true,
            'table-bordered': this.props.bordered,
            'table-hover': true,
            'table-condensed': this.props.condensed,
            'customtable': true,
            'suptable': true,
        });
        return (
            <div className="container-fluid" >
                <div className="row">
                    <div className="col-sm-3">
                        <div className="title">
                            <h1>Orders</h1>
                        </div>
                    </div>

                    <div className="col-sm-4 exportDropdown ml-auto">
                        <UncontrolledDropdown direction="down">
                            <DropdownToggle >
                                <i className="fa fa-file-excel-o" aria-hidden="true" title="Export"></i>
                            </DropdownToggle>
                            <DropdownMenu left>
                                <DropdownItem>
                                    <img src="assets/images/export-icon.svg" alt="" className="mr-2 icon"/>
                                    <CSVLink data={this.state.OrderId === null ? data : this.state.ebayOrdersData} headers={headers} filename={'Orders.csv'} className="link">
                                        Export Order
                                                    </CSVLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <img src="assets/images/export-icon.svg" alt="" className="mr-2 icon" />
                                    {/* {console.log("lazyLoadedFactOrderData--", this.state.updatedFactOrders)} */}
                                    <CSVLink data={this.state.OrderId === null ? eBayData : this.state.updatedFactOrders} headers={FactOrderDataHeaders} filename={'OrderDetails.csv'} className="link">
                                        Export Order Details
                                                    </CSVLink>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                </div>

                <div className="card card-default">
                    <div className="card-body">
                        <form>
                            <div className="row">
                                <div className="col-sm-5">
                                    <div className="dispFlex" ref={this.container}>
                                        <button onClick={this.handleButtonClick} className="dropdown-toggle btnToggled" type="button"></button>
                                        {this.state.open && (
                                            <div className="dropdown-searchOptions">
                                                <ul className="searchItemsList">
                                                    <li onClick={this.setActiveFilter.bind(this)} id="All" className="searchItems">All</li>
                                                    <li onClick={this.setActiveFilter.bind(this)} id="CustomerName" className="searchItems">Customer Name</li>
                                                    <li onClick={this.setActiveFilter.bind(this)} id="ItemNumber" className="searchItems">Item Number</li>
                                                    <li onClick={this.setActiveFilter.bind(this)} id="SalesRecordReference" className="searchItems">Order Number</li>
                                                    <li onClick={this.setActiveFilter.bind(this)} id="TrackingNumber" className="searchItems">Tracking Number</li>
                                                </ul>
                                            </div>
                                        )}
                                        <input maxLength="50" onChange={(e) => this.handleOrderNumber(e)} type="textbox" className="form-control orderSearch searchTextBox" placeholder={this.state.activeFilter === 'All' ? 'All' : this.state.activeFilter === 'CustomerName' ? 'Customer Name' : this.state.activeFilter === 'ItemNumber' ? 'Item Number' : this.state.activeFilter === 'SalesRecordReference' ? 'Order Number' : this.state.activeFilter === 'TrackingNumber' ? 'Tracking Number' : 'All'} />
                                        <button className="searchButtonIcon" type="button"><i className="fa fa-search searchIcon"></i></button>

                                    </div>
                                </div>

                            </div>
                        </form>
                        <br />
                        <div id="your_div" className="table-responsive table-sticky" ref="table" onScroll={this.handleScroll.bind(this)}>
                            <table striped hover className={`${tableClass} MainTable `} >
                                <thead>
                                    <tr>
                                        <th width="12%">Order Number <span className="filterArrow"> <SortingCustom setSortColumn={this.setSortColumn} columnName='storeOrderNumber' /></span></th>
                                        <th width="12%">Item Number <span className="filterArrow"> <SortingCustom setSortColumn={this.setSortColumn} columnName='itemNumber' /></span></th>
                                        <th width="18%">Tracking Number <span className="filterArrow"> <SortingCustom setSortColumn={this.setSortColumn} columnName='trackingNumber' /></span></th>
                                        <th width="10%">Item <span className="filterArrow"> <SortingCustom setSortColumn={this.setSortColumn} columnName='kitSKU' /></span></th>
                                        <th width="13%">Customer <span className="filterArrow"> <SortingCustom setSortColumn={this.setSortColumn} columnName='customer' /></span></th>
                                        <th width="30%">Address <span className="filterArrow"> <SortingCustom setSortColumn={this.setSortColumn} columnName='address' /></span></th>
                                        <th width="5%"></th>

                                    </tr>
                                </thead>
                                <tbody className="mainTbody">


                                    {this.renderAppointments()}
                                    {(this.state.ebayOrdersData.length === 0 || this.state.loading) ?
                                        // <td style={{ "display": "flex" }}>
                                        //     <ProgressSpinner style={{ width: '30px', height: '50px'}} strokeWidth="6" animationDuration=".8s" /><span style={{ "marginTop": "15px", "marginLeft": "5px" }}>Loading...</span>
                                        // </td>
                                        <tr>

                                            <td colSpan={7} className="text-center no-record">{(this.state.loading || this.state.scrollLoading) ? 'Loading, Please wait...' : 'No records found'}</td>
                                        </tr>
                                        : null}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default EbayOrders;