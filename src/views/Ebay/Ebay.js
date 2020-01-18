
// // // import React, {Component} from 'react';
// // // import {DataScroller} from 'primereact/datascroller';
// // // import {Button} from 'primereact/button';
// // // import {CarService} from '../service/CarService';

// // // export class DataScrollerLoaderDemo extends Component {

// // //     constructor() {
// // //         super();
// // //         this.state = { 
// // //             ebaydata: []
// // //         };
// // //         this.carservice = new CarService();
// // //         this.carTemplate = this.carTemplate.bind(this);
// // //     }

// // //     componentDidMount() {
// // //         this.carservice.getCarsLarge().then(data => this.setState({cars: data}));
// // //     }

// // //     carTemplate(car) {
// // //         if (!car) {
// // //             return;
// // //         }

// // //         const src = "showcase/resources/demo/images/car/" + car.brand + ".png";

// // //         return (
// // //             <div className="p-grid car-item">
// // //                 <div className="p-col-12 p-md-3">
// // //                     <img src={src} alt="Car" />
// // //                 </div>
// // //                 <div className="p-col-12 p-md-9">
// // //                     <div className="p-grid">
// // //                         <div className="p-col-2 p-sm-6">Vin: </div>
// // //                         <div className="p-col-10 p-sm-6">{car.vin}</div>

// // //                         <div className="p-col-2 p-sm-6">Year: </div>
// // //                         <div className="p-col-10 p-sm-6">{car.year}</div>

// // //                         <div className="p-col-2 p-sm-6">Brand: </div>
// // //                         <div className="p-col-10 p-sm-6">{car.brand}</div>

// // //                         <div className="p-col-2 p-sm-6">Color: </div>
// // //                         <div className="p-col-10 p-sm-6">{car.color}</div>
// // //                     </div>
// // //                 </div>
// // //             </div>
// // //         );
// // //     }

// // //     render() {
// // //         const footer = <Button ref={(el) => this.loadButton = el} type="text" icon="pi pi-plus" label="Load" />;

// // //         return (
// // //             <div className="datascroll-demo">
// // //                 <div className="content-section introduction">
// // //                     <div className="feature-intro">
// // //                         <h1>DataScroller - Loader</h1>
// // //                         <p>Instead of scrolling, a custom element can be used to load data.</p>
// // //                     </div>
// // //                 </div>

// // //                 <div className="content-section implementation">
// // //                     <DataScroller value={this.state.cars} itemTemplate={this.carTemplate} rows={5} 
// // //                         loader={this.loadButton} footer={footer} header="Click Load Button at Footer to Load More"/>
// // //                 </div>
// // //             </div>
// // //         );
// // //     }
// // // }
// import React, { Component } from 'react';
// import { API_URL } from '../../actions/utilAction';
// import axios from 'axios';
// import {ProgressSpinner} from 'primereact/progressspinner';
//  import {DataScroller} from 'primereact/datascroller';
//  import {DataTable} from 'primereact/datatable';
//  import {Column} from 'primereact/column';
// export default class Ebay extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       ebayOrdersData: []
//     }
//     this.carTemplate = this.carTemplate.bind(this);

//   }
//   componentDidMount() {
//     let ebaydataAPI = `${API_URL}/api/Warehouse/GetEbayOrders?PageSize=60&PageNo=1&SortOrder=${this.state.sortOrder}&OrderBy=${this.state.orderBy}`;
//     axios.get(ebaydataAPI,
//       { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } }
//     )
//       .then(res => {
//         this.setState({
//           ebayOrdersData: res.data.data,
//         })
//       })
//   }

//   carTemplate(car) {
//      debugger
//      const columns = [
//       {field: 'orderID', header: 'OrderID'},
//       {field: 'itemNumber', header: 'ItemNumber'},
//       {field: 'trackingNumber', header: 'TrackingNumber'},
//       {field: 'kitSKU', header: 'KitSKU'},
//       {field: 'customer', header: 'Customer'},
//       {field: 'address', header: 'Addrerss'},

//   ];

//   const dynamicColumns = columns.map((col,i) => {
//       return <Column key={col.field} field={col.field} header={col.header} />;
//   });
//     if (!car) {
//         return;
//     }

//     return (
//       <div >
//       {/* // <table className="table table-bordered table-default table-hover mb-0">
//       // <thead>
//       //        <tr>
//       //        <th >OrderID</th>
//       //       <th>ItemNumber</th>
//       //       <th>TrackingNumber</th>
//       //       <th>KitSKU</th>
//       //       <th>Customer</th>
//       //       <th>Addrerss</th>
//       //        </tr>
          
//       //     </thead>
//       //   <tbody>
//       //     <tr>
//       //       <td>{car.orderID}</td>
//       //       <td>{car.itemNumber}</td>
//       //       <td>{car.trackingNumber}</td>
//       //       <td>{car.kitSKU}</td>
//       //       <td>{car.customer}</td>
//       //       <td>{car.address}</td>
//       //     </tr>
//       //   </tbody>
//       // </table> */}
//          <DataTable value={this.state.ebayOrdersData}>
//                         {dynamicColumns}
//                     </DataTable>
//       </div>
//     );
// }
//   render() { 
//     const footer =<ProgressSpinner style={{width:'30px', height: '40px'}} strokeWidth="4" fill="#EEEEEE" animationDuration=".8s"/>


//     return (
//       <div className="datascroll-demo">
  



//       <div className="content-section implementation">
//           <DataScroller value={this.state.ebayOrdersData} itemTemplate={this.carTemplate}  rows={10}
//              footer={footer} />
//       </div>
//   </div>
//     )
//   }
// }
import React, { Component } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

const style = {
    height: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8
  };
export default class Ebay extends Component {
    constructor(props){
        super(props);
        this.state={
            items: Array.from({ length: 20 })
        };
    }
    fetchMoreData =()=>{
        
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
